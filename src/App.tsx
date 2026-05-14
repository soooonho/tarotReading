import { useState } from "react";
import tarotDataRaw from "./tarotData.json";
import "./App.css";

interface TarotGroup {
  group_id: number; //소울 카드
  target_sum: number; //성격 카드
  cards: number[]; // 해당 그룹에 속하는 메이저 카드 번호
  names: string[]; // 카드 이름 배열
  keywords: string[]; // 대표 키워드 배열
  description: string; // 해당 조합의 해석
}
const tarotData = tarotDataRaw.tarot_birth_cards;
export default function App() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [tarot, setTarot] = useState<TarotGroup | null>(null);
  const calcTarot = (y: string, m: string, d: string) => {
    const dateStr = y + m + d;
    const getSum = (numStr: string): number => {
      return numStr.split("").reduce((acc, curr) => acc + parseInt(curr), 0);
    };

    const totalSum = getSum(dateStr);

    // 성격 카드
    let personalityNum = getSum(dateStr);

    while (personalityNum > 22) {
      personalityNum = getSum(personalityNum.toString());
    }
    //영혼 카드
    let soulNumber = totalSum;
    while (soulNumber > 9) {
      soulNumber = getSum(soulNumber.toString());
    }

    //성격 카드와 일치하는 target_sum 검색
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
    //calcTarot(year, month, day);
    const result = calcTarot(year, month, day);
    setTarot(result || null);
  };
  return (
    <div className="app">
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

      {tarot && (
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
              <img src={`/major${tarot.cards[0]}.svg`} alt="소울 카드" />
            </div>
            <div className="card-wrap">
              <span className="card-label">성격 카드</span>
              <img src={`/major${tarot.cards[1]}.svg`} alt="성격 카드" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
