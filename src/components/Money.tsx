import { getShuffledDeck } from "../tarotControl";
import { useTarotState } from "../hooks/useTarotState";
import FlippedCard from "./FlippedCard";
import moneyTarotDataRaw from "../assets/data/moneyTarotData.json";
import { handleTarotClick } from "../hooks/handleTarotClick";
import ShowCards from "./ShowCards";
const deck = getShuffledDeck();
const page = "normal";
const category = "money";
const maxSelectedCard = 3;
export default function Love() {
  const { selectedCards, setSelectedCards, flipCards, setFlipCards } =
    useTarotState(category);
  console.log(deck);
  return (
    <>
      {flipCards && (
        <ShowCards
          page={page}
          category={category}
          rawData={moneyTarotDataRaw}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          setFlipCards={setFlipCards}
          again={true}
          share={true}
        />
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
    </>
  );
}
