import { useState } from "react";
import tarotDataRaw from "../assets/data/tarotData.json";
import "../App.css";

interface TarotGroup {
  group_id: number;
  target_sum: number;
  cards: number[];
  names: string[];
  keywords: string[];
  description: string;
}

const tarotData = tarotDataRaw;

export default function SoulCard() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [savedData] = useState(() => {
    const history = JSON.parse(localStorage.getItem("soul") || "null");
    return history;
  });
  const [tarot, setTarot] = useState<TarotGroup | null>(
    savedData ? savedData : null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const calcTarot = (y: string, m: string, d: string) => {
    const dateStr = y + m + d;
    const getSum = (numStr: string): number => {
      return numStr.split("").reduce((acc, curr) => acc + parseInt(curr), 0);
    };
    const totalSum = getSum(dateStr);
    let personalityNum = getSum(dateStr);
    while (personalityNum > 22) {
      personalityNum = getSum(personalityNum.toString());
    }
    let soulNumber = totalSum;
    while (soulNumber > 9) {
      soulNumber = getSum(soulNumber.toString());
    }
    if (personalityNum < 10)
      return tarotData.find((item) => item.group_id === soulNumber);
    return tarotData.find((item) => item.target_sum === personalityNum);
  };

  const clickHandler = () => {
    if (year.length > 4 || month.length > 2 || day.length > 2) return;
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return;
    const result = calcTarot(year, month, day);
    setIsLoading(true);
    setTimeout(() => {
      setTarot(result!);
      localStorage.setItem("soul", JSON.stringify(result));
      setIsLoading(false);
    }, 2500);
  };

  return (
    <>
      <div className="form-section">
        <div className="moon-icon">🌙</div>
        <h1 className="app-title">운명의 타로 카드</h1>
        <div className="input-group">
          <div className="input-wrapper">
            <input
              placeholder="년 (예: 1995)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="월 (예: 08)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="일 (예: 23)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
        </div>
        <button className="confirm-btn" onClick={clickHandler}>
          확인해보기
        </button>
      </div>

      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            gap: "24px",
          }}
        >
          <p
            style={{
              color: "var(--silver)",
              letterSpacing: "0.3em",
              fontSize: "1rem",
            }}
          >
            카드를 해석하는 중...
          </p>
        </div>
      )}

      {!isLoading && tarot && (
        <div className="result">
          <div className="divider">
            <span className="divider-star">✦</span>
          </div>
          <p className="card-names">
            {tarot.names[0]} &amp; {tarot.names[1]}
          </p>
          <p className="card-keywords">{tarot.keywords.join(" · ")}</p>
          <p className="card-description">{tarot.description}</p>
          <div className="cards-row">
            <div className="card-wrap">
              <span className="card-label">소울 카드</span>
              <img src={`${tarot.cards[0]}.png`} alt="소울 카드" />
            </div>
            <div className="card-wrap">
              <span className="card-label">성격 카드</span>
              <img src={`${tarot.cards[1]}.png`} alt="성격 카드" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
