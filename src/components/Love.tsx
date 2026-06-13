import { getShuffledDeck } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import FlippedCard from "./FlippedCard";
import loveTarotDataRaw from "../assets/data/loveTarotData.json";
import { handleTarotClick } from "../hooks/handleTarotClick";
import ShowCards from "./ShowCards";
import { useState, useEffect } from "react";
import "../Tarot.css";

const deck = getShuffledDeck();
const page = "normal";
const category = "love";
const maxSelectedCard = 3;

export default function Love() {
  const { selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (value) => {
    const nextSelectedCards = [...selectedCards, value];
    if (nextSelectedCards.length >= maxSelectedCard) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2500);
    }
    handleTarotClick(
      category,
      maxSelectedCard,
      value,
      flipCards,
      setFlipCards,
      selectedCards,
      setSelectedCards,
    );
  };

  return (
    <>
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
      {!isLoading && flipCards && (
        <div className="result-layout">
          <ShowCards
            page={page}
            category={category}
            rawData={loveTarotDataRaw}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            setFlipCards={setFlipCards}
            again={true}
            share={true}
          />
        </div>
      )}
      {!flipCards && !isLoading && (
        <div className="tarot-grid-container">
          {deck.map((value, index) => (
            <FlippedCard
              key={index}
              cardNum={
                flipCards && selectedCards.includes(value) ? value.cardNum : 0
              }
              upright={
                flipCards && selectedCards.includes(value)
                  ? value.upright
                  : true
              }
              onClick={() => handleCardClick(value)}
              className={selectedCards.includes(value) ? "card-selected" : ""}
            />
          ))}
        </div>
      )}
    </>
  );
}
