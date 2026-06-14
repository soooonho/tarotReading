import type { tarotCard } from "../tarotControl";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";

import "../Button.css";
import "../Tarot.css";
import "../App.css";

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
  setDeck,
}: {
  page: string;
  category: string;
  rawData: RawTarotData[];
  selectedCards: tarotCard[];
  setSelectedCards?: React.Dispatch<React.SetStateAction<tarotCard[]>>;
  setFlipCards?: React.Dispatch<React.SetStateAction<boolean>>;
  again: boolean;
  share: boolean;
  setDeck: React.Dispatch<
    React.SetStateAction<{ cardNum: number; upright: boolean }[]>
  >;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          paddingTop: "64px", // nav 높이에 맞게 조정
        }}
      >
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
        <p className="card-description">
          {selectedCards[0].upright
            ? rawData[selectedCards[0].cardNum].upright
            : rawData[selectedCards[0].cardNum].reversed}
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          {again && (
            <button
              className="btn-again"
              onClick={() =>
                handleRestart(setSelectedCards!, setFlipCards!, setDeck)
              }
            >
              다시
            </button>
          )}
          {share && (
            <button
              className="btn-share"
              onClick={() => handleShareUrl(page, category, selectedCards)}
            >
              공유
            </button>
          )}
        </div>
      </div>
    </>
  );
}
