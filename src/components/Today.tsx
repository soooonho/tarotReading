import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import FlippedCard from "./FlippedCard";
import { getShuffledDeck, type tarotRecord } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import { handleTarotClick } from "../hooks/handleTarotClick";
import { handleClickHistory } from "../hooks/handleClickHistory";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";
import "../Tarot.css";

const deck = getShuffledDeck();
const page = "daily";
const category = "daily";
const maxSelectedCard = 1;
export default function Today() {
  const { history, selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  return (
    <>
      <div>
        {selectedCards[0] && (
          <>
            <h1>{dailyTarotDataRaw[selectedCards[0].cardNum].name}</h1>
            <p>
              {dailyTarotDataRaw[selectedCards[0].cardNum].keywords
                .map((value) => value)
                .join(", ")}
            </p>
            <img
              src={`${selectedCards[0].cardNum}.png`}
              style={
                selectedCards[0].upright
                  ? { width: "200px" }
                  : {
                      width: "200px",
                      transform: "rotate(180deg)",
                    }
              }
            />
            <p>
              {selectedCards[0].upright
                ? dailyTarotDataRaw[selectedCards[0].cardNum].upright
                : dailyTarotDataRaw[selectedCards[0].cardNum].reversed}
            </p>
            <button
              className="basic-btn"
              onClick={() => handleRestart(setSelectedCards, setFlipCards)}
            >
              다시
            </button>
            <button
              className="basic-btn"
              onClick={() => handleShareUrl(page, category, selectedCards)}
            >
              공유
            </button>
          </>
        )}
      </div>
      {!flipCards && (
        <div className="tarot-grid-container">
          {deck.map((value) => (
            <FlippedCard
              key={value.cardNum} // value 전체보다는 고유한 cardNum이나 별도 id가 좋습니다.
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
      {history &&
        history.map((item: tarotRecord) => (
          <button
            key={item.date}
            onClick={() =>
              handleClickHistory(item, setSelectedCards, setFlipCards)
            }
          >
            {item.date}
          </button>
        ))}
    </>
  );
}
