import type { tarotCard } from "../tarotControl";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";
interface RawTarotData {
  card_id: number;
  name: string;
  past_upright: string;
  past_reversed: string;
  present_upright: string;
  present_reversed: string;
  future_upright: string;
  future_reversed: string;
}
export default function ShowCards({
  page,
  category,
  rawData,
  selectedCards,
  setSelectedCards,
  setFlipCards,
  again,
  share,
}: {
  page: string;
  category: string;
  rawData: RawTarotData[];
  selectedCards: tarotCard[];
  setSelectedCards?: React.Dispatch<React.SetStateAction<tarotCard[]>>;
  setFlipCards?: React.Dispatch<React.SetStateAction<boolean>>;
  again: boolean;
  share: boolean;
}) {
  return (
    <>
      <h1>{rawData[selectedCards[0].cardNum].name}</h1>
      <img
        src={`${selectedCards[0].cardNum}.png`}
        style={!selectedCards[0].upright ? { transform: "rotate(180deg)" } : {}}
      />
      <p>
        {selectedCards[0].upright
          ? rawData[selectedCards[0].cardNum].past_upright
          : rawData[selectedCards[0].cardNum].past_reversed}
      </p>
      <h1>{rawData[selectedCards[1].cardNum].name}</h1>
      <img
        src={`${selectedCards[1].cardNum}.png`}
        style={!selectedCards[1].upright ? { transform: "rotate(180deg)" } : {}}
      />
      <p>
        {selectedCards[1].upright
          ? rawData[selectedCards[1].cardNum].present_upright
          : rawData[selectedCards[1].cardNum].present_reversed}
      </p>
      <h1>{rawData[selectedCards[2].cardNum].name}</h1>
      <img
        src={`${selectedCards[2].cardNum}.png`}
        style={!selectedCards[2].upright ? { transform: "rotate(180deg)" } : {}}
      />
      <p>
        {selectedCards[2].upright
          ? rawData[selectedCards[2].cardNum].future_upright
          : rawData[selectedCards[2].cardNum].future_reversed}
      </p>{" "}
      {again&& (
        <button onClick={() => handleRestart(setSelectedCards, setFlipCards)}>
          다시
        </button>
      )}
      {share && (
        <button onClick={() => handleShareUrl(page, category, selectedCards)}>
          공유
        </button>
      )}
    </>
  );
}
