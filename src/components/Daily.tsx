import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import FlippedCard from "./FlippedCard";
import { getShuffledDeck } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import { handleTarotClick } from "../hooks/handleTarotClick";
import ShowDailyCard from "./ShowDailyCard";
import { useState, useEffect, useRef } from "react";

import "../Tarot.css";

let deck = getShuffledDeck();
const page = "daily";
const category = "daily";
const maxSelectedCard = 1;

export default function Daily() {
  const { selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstCard = useRef(selectedCards.length === 0); // 이미 카드 있으면 false로 시작
  useEffect(()=>{
    deck = getShuffledDeck();
  },[flipCards]);
  useEffect(() => {
    if (selectedCards.length > 0) {
      if (isFirstCard.current) {
        setIsLoading(true);
        isFirstCard.current = false;
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedCards.length]);

  return (
    <>
      <div>
        {isLoading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
              gap: "24px",
            }}
          >
            <p
              style={{
                color: "var(--silver)",
                letterSpacing: "0.3em",
                fontSize: "1rem",
              }}
            >
              카드를 해석하는 중...
            </p>
          </div>
        )}
        {!isLoading && selectedCards[0] && (
          <div className="slide-up">
            <ShowDailyCard
              page={page}
              category={category}
              rawData={dailyTarotDataRaw}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              setFlipCards={setFlipCards}
              again={true}
              share={true}
            />
          </div>
        )}
      </div>
      {!flipCards && !isLoading && (
        <div className="tarot-grid-container">
          {deck.map((value) => (
            <FlippedCard
              key={value}
              cardNum={
                flipCards && selectedCards.includes(value) ? value.cardNum : 0
              }
              upright={
                flipCards && selectedCards.includes(value)
                  ? value.upright
                  : true
              }
              onClick={() =>
                handleTarotClick(
                  category,
                  maxSelectedCard,
                  value,
                  flipCards,
                  setFlipCards,
                  selectedCards,
                  setSelectedCards,
                )
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
