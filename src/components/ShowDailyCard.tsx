import type { tarotCard } from "../tarotControl";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";
interface RawTarotData {
  id: number;
  name: string;
  keywords: string[];
  upright: string;
  reversed: string;
}
export default function ShowDailyCard({
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
      <p>
        {rawData[selectedCards[0].cardNum].keywords
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
          ? rawData[selectedCards[0].cardNum].upright
          : rawData[selectedCards[0].cardNum].reversed}
      </p>
      {again && (
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
