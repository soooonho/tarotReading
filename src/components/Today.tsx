import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import FlippedCard from "./FlippedCard";
import { getShuffledDeck, type tarotRecord } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import { handleTarotClick } from "../hooks/handleTarotClick";
import { handleClickHistory } from "../hooks/handleClickHistory";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";
const deck = getShuffledDeck();
const page = "today";
const category = "today";
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
              onClick={() => handleRestart(setSelectedCards, setFlipCards)}
            >
              다시
            </button>
            <button
              onClick={() => handleShareUrl(page, category, selectedCards)}
            >
              공유
            </button>
          </>
        )}
      </div>
      {!flipCards &&
        deck.map((value) => (
          <FlippedCard
            key={value}
            cardNum={
              flipCards && selectedCards.includes(value) ? value.cardNum : 0
            }
            upright={
              flipCards && selectedCards.includes(value) ? value.upright : true
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
