import { getShuffledDeck, type tarotRecord } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import FlippedCard from "./FlippedCard";
import loveTarotDataRaw from "../assets/data/loveTarotData.json";
import { handleTarotClick } from "../hooks/handleTarotClick";
import { handleRestart } from "../hooks/handleRestart";
import { handleClickHistory } from "../hooks/handleClickHistory";
import { handleShareUrl } from "../hooks/handleShareUrl";
const deck = getShuffledDeck();
const page="normal";
const category = "money";
const maxSelectedCard = 3;
export default function Love() {
  const { history, selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  return (
    <>
      {flipCards && (
        <>
          <h1>{loveTarotDataRaw[selectedCards[0].cardNum].name}</h1>
          <img
            src={`${selectedCards[0].cardNum}.png`}
            style={
              !selectedCards[0].upright ? { transform: "rotate(180deg)" } : {}
            }
          />
          <p>
            {selectedCards[0].upright
              ? loveTarotDataRaw[selectedCards[0].cardNum].past_upright
              : loveTarotDataRaw[selectedCards[0].cardNum].past_reversed}
          </p>
          <h1>{loveTarotDataRaw[selectedCards[1].cardNum].name}</h1>
          <img
            src={`${selectedCards[1].cardNum}.png`}
            style={
              !selectedCards[1].upright ? { transform: "rotate(180deg)" } : {}
            }
          />
          <p>
            {selectedCards[1].upright
              ? loveTarotDataRaw[selectedCards[1].cardNum].present_upright
              : loveTarotDataRaw[selectedCards[1].cardNum].present_reversed}
          </p>
          <h1>{loveTarotDataRaw[selectedCards[2].cardNum].name}</h1>
          <img
            src={`${selectedCards[2].cardNum}.png`}
            style={
              !selectedCards[2].upright ? { transform: "rotate(180deg)" } : {}
            }
          />
          <p>
            {selectedCards[2].upright
              ? loveTarotDataRaw[selectedCards[2].cardNum].future_upright
              : loveTarotDataRaw[selectedCards[2].cardNum].future_reversed}
          </p>{" "}
          <button onClick={() => handleRestart(setSelectedCards, setFlipCards)}>
            다시
          </button>
          <button onClick={() => handleShareUrl(page, category, selectedCards)}>
            공유
          </button>
        </>
      )}
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
