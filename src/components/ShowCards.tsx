import type { tarotCard } from "../tarotControl";
import { handleShareUrl } from "../hooks/handleShareUrl";
import { handleRestart } from "../hooks/handleRestart";

import "../Button.css";
import "../Tarot.css";
import "../App.css";

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
  const positions = ["과거", "현재", "미래"];
  const fields = ["past", "present", "future"] as const;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        paddingTop: "64px", // nav 높이에 맞게 조정
      }}
    >
      {/* 카드 가로 배열 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {selectedCards.map((card, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <h1>{positions[i]}</h1>
            <h2>{rawData[card.cardNum].name}</h2>
            <img
              src={`${card.cardNum}.png`}
              style={
                !card.upright
                  ? { width: "200px", transform: "rotate(180deg)" }
                  : { width: "200px" }
              }
            />
            <p className="card-description">
              {card.upright
                ? rawData[card.cardNum][`${fields[i]}_upright`]
                : rawData[card.cardNum][`${fields[i]}_reversed`]}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {again && (
          <button
            className="btn-again"
            onClick={() => handleRestart(setSelectedCards!, setFlipCards!)}
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
  );
}
