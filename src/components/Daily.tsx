import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import FlippedCard from "./FlippedCard";
import { getShuffledDeck, type tarotRecord } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import { handleTarotClick } from "../hooks/handleTarotClick";
import ShowDailyCard from "./ShowDailyCard";

import "../Tarot.css";

const deck = getShuffledDeck();
const page = "daily";
const category = "daily";
const maxSelectedCard = 1;
export default function Daily() {
  const { selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  return (
    <>
      <div>
        {selectedCards[0] && (
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
      {!flipCards && (
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
