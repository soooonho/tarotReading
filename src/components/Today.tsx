import { useState } from "react";
import TodayCard from "./TodayCard";
import dailyTarotDataRaw from "../dailyTarotData.json";
const dailyTarot = dailyTarotDataRaw.daily_tarot_cards;
const shuffle = (arr: number[]) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};
const getCardDirection = () => {
  return Math.random() > 0.5;
};
const initialDeck = [...Array(22).keys()];
const deck = shuffle(initialDeck);
let upright = true;
export default function Today() {
  const [selectedCard, setSelectedCard] = useState(-1);
  const tarotOnClick = (cardNum: number) => {
    upright = getCardDirection();
    setSelectedCard(cardNum);
  };
  return (
    <>
      <div>
        {selectedCard !== -1 && (
          <>
            <h1>{dailyTarot[selectedCard].name}</h1>
            <p>
              {dailyTarot[selectedCard].keywords
                .map((value) => value)
                .join(", ")}
            </p>
            <img
              src={`${selectedCard}.png`}
              style={
                upright
                  ? { width: "200px" }
                  : {
                      width: "200px",
                      transform: "rotate(180deg)",
                    }
              }
            />
            <p>
              {upright
                ? dailyTarot[selectedCard].upright
                : dailyTarot[selectedCard].reversed}
            </p>
          </>
        )}
      </div>
      {/* <TodayCard
        isClicked={isClicked}
        cardNum={3}
        tarotOnClick={tarotOnClick}
      />
      <TodayCard
        isClicked={isClicked}
        cardNum={4}
        tarotOnClick={tarotOnClick}
      /> */}
      {deck.map((value) => (
        <TodayCard
          key={value}
          selectedCard={selectedCard}
          cardNum={value}
          tarotOnClick={tarotOnClick}
        />
      ))}
    </>
  );
}
