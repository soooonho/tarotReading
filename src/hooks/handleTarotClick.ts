import { saveTarotCards, type tarotCard } from "../tarotControl";

export const handleTarotClick = (
  category: string,
  maxSelectedCard:number,
  card: tarotCard,
  flipCards: boolean,
  setFlipCards: React.Dispatch<React.SetStateAction<boolean>>,
  selectedCards: tarotCard[],
  setSelectedCards: React.Dispatch<React.SetStateAction<tarotCard[]>>,
) => {
  if (flipCards) return;
  if (selectedCards.includes(card)) {
    setSelectedCards((selectedCards) =>
      [...selectedCards].filter((value) => value !== card),
    );
    return;
  }
  const nextSelectedCards = [...selectedCards, card];
  setSelectedCards(nextSelectedCards);
  if (nextSelectedCards.length >= maxSelectedCard) {
    saveTarotCards(nextSelectedCards, category);
    setFlipCards(true);
  }
};
