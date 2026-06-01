import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import FlippedCard from "./FlippedCard";
import { getShuffledDeck, type tarotRecord } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import { handleTarotClick } from "../hooks/handleTarotClick";
import ShowDailyCard from "./ShowDailyCard";
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
          <ShowDailyCard
            page={page}
            category={category}
            rawData={dailyTarotDataRaw}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            setFlipCards={setFlipCards}
            again={true}
            share={true}
          ></ShowDailyCard>
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
      {/* {history &&
        history.map((item: tarotRecord) => (
          <button
            key={item.date}
            onClick={() =>
              handleClickHistory(item, setSelectedCards, setFlipCards)
            }
          >
            {item.date}
          </button>
        ))} */}
    </>
  );
}
