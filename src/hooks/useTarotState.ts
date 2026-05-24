import { useState } from "react";
import { getToday, type tarotCard, type tarotRecord } from "../tarotControl";

export const useTarotState = (category: string) => {
  const [history] = useState(() => {
    return JSON.parse(localStorage.getItem(category) || "null");
  });
  const [savedCards] = useState(() => {
    if (history === null) return;
    const found = history.find((item: tarotRecord) => item.date === getToday());
    return found ? found.cards : null;
  });
  const [selectedCards, setSelectedCards] = useState<tarotCard[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const cards = params.get("cards");
    const upright = params.get("upright");
    const sharedCategory = params.get("category");
    if (cards && upright && category === sharedCategory) {
      const parsedCards = cards.split(",").map(Number);
      const parsedUpright = upright.split(",").map((val) => val === "true");
      const sharedCards: tarotCard[] = [];
      for (let i = 0; i < parsedCards.length; i++) {
        sharedCards.push({
          cardNum: parsedCards[i],
          upright: parsedUpright[i],
        });
      }
      return sharedCards;
    } else if (savedCards) return savedCards;
    else return [];
  });
  const [flipCards, setFlipCards] = useState(
    selectedCards.length !== 0 ? true : false,
  );
  return {
    history,
    selectedCards,
    setSelectedCards,
    flipCards,
    setFlipCards,
  };
};
