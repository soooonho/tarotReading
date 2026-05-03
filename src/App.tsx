import { useState } from "react";
import tarotDataRaw from "./tarotData.json";
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
    <>
      <input
        placeholder="년"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        placeholder="월"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        placeholder="일"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <button onClick={clickHandler}>확인</button>
      <h1>{tarot ? tarot.names[0] + " " + tarot.names[1] : ""}</h1>
      <h2>{tarot ? tarot.keywords.map((value) => value).join(" ") : ""}</h2>
      <p>{tarot ? tarot.description : ""}</p>
      <img
        src={tarot ? `/major${tarot.cards[0]}.svg` : ""}
        alt="소울 카드"
        width="200"
        height="300"
      />
      <img
        src={tarot ? `/major${tarot.cards[1]}.svg` : ""}
        alt="성격 카드"
        width="200"
        height="300"
      />
    </>
  );
}
