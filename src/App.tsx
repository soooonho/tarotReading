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
      {/* 천상열차분야지도 회전 배경 */}
      <div className="stars-static" />
      <div className="cheonsang-bg">
        <svg viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
          {/* 바깥 원 — 체커 테두리 + 방사선 + 외곽 별자리 (시계) */}
          <g className="ring-outer" style={{ transformOrigin: "340px 340px" }}>
            <circle
              cx="340
              "
              cy="340"
              r="322"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="14"
            />
            <circle
              cx="340"
              cy="340"
              r="308"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="1.5"
            />
            <circle
              cx="340"
              cy="340"
              r="301"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="0.6"
            />
            {/* 체커 블록 */}
            {Array.from({ length: 24 }).map((_, i) => {
              return i % 2 === 0 ? (
                <rect
                  key={i}
                  x={340 - 14}
                  y={340 - 329}
                  width="28"
                  height="18"
                  rx="2"
                  fill="#c8d4e0"
                  transform={`rotate(${i * 15} 340 340)`}
                />
              ) : (
                <rect
                  key={i}
                  x={340 - 14}
                  y={340 - 328}
                  width="28"
                  height="18"
                  rx="2"
                  fill="#08080e"
                  stroke="#c8d4e0"
                  strokeWidth="1"
                  transform={`rotate(${i * 15} 340 340)`}
                />
              );
            })}
            {/* 28수 방사선 + 점 */}
            {Array.from({ length: 28 }).map((_, i) => {
              const a = (i * (360 / 28) * Math.PI) / 180;
              const ox = 340 + 301 * Math.cos(a),
                oy = 340 + 301 * Math.sin(a);
              const ix = 340 + 270 * Math.cos(a),
                iy = 340 + 270 * Math.sin(a);
              return (
                <g key={i}>
                  <line
                    x1={ox}
                    y1={oy}
                    x2={ix}
                    y2={iy}
                    stroke="#c8d4e0"
                    strokeWidth="0.7"
                    opacity="0.5"
                  />
                  <circle
                    cx={ox}
                    cy={oy}
                    r={i % 4 === 0 ? 4 : 2.5}
                    fill="#c8d4e0"
                    opacity="0.9"
                  />
                </g>
              );
            })}
          </g>

          {/* 중간 원 — 황도 영역 + 별자리 (반시계) */}
          <g className="ring-middle" style={{ transformOrigin: "340px 340px" }}>
            <circle
              cx="340"
              cy="340"
              r="270"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="1.2"
            />
            <circle
              cx="340"
              cy="340"
              r="264"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="0.4"
              strokeDasharray="3 5"
            />
            <circle
              cx="340"
              cy="340"
              r="200"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="0.9"
            />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              const ox = 340 + 264 * Math.cos(a),
                oy = 340 + 264 * Math.sin(a);
              const ix = 340 + 202 * Math.cos(a),
                iy = 340 + 202 * Math.sin(a);
              return (
                <g key={i}>
                  <line
                    x1={ox}
                    y1={oy}
                    x2={ix}
                    y2={iy}
                    stroke="#c8d4e0"
                    strokeWidth="0.6"
                    opacity="0.4"
                  />
                  <circle cx={ox} cy={oy} r="3" fill="#c8d4e0" />
                </g>
              );
            })}
            {/* 별자리 선들 */}
            <g fill="none" stroke="#c8d4e0" strokeWidth="0.6" opacity="0.55">
              <polyline points="355,115 372,132 360,152 378,168 365,186" />
              <polyline points="535,260 555,278 545,298 560,315 548,335" />
              <polyline points="470,530 488,548 478,568 495,580" />
              <polyline points="220,530 205,548 215,565 200,580" />
              <polyline points="155,260 138,278 148,295 132,312" />
              <polyline points="220,158 205,175 215,192 200,208" />
              <polyline points="390,222 408,238 398,258 415,270" />
              <polyline points="270,418 255,435 265,452 250,468" />
            </g>
            <g fill="#c8d4e0">
              {[
                [362, 120],
                [375, 148],
                [393, 118],
                [545, 270],
                [558, 305],
                [480, 540],
                [490, 572],
                [210, 542],
                [162, 422],
                [143, 270],
                [210, 168],
                [400, 230],
                [410, 260],
                [260, 428],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.8" />
              ))}
            </g>
          </g>

          {/* 안쪽 원 — 북극 영역 (시계, 빠름) */}
          <g className="ring-inner" style={{ transformOrigin: "340px 340px" }}>
            <circle
              cx="340"
              cy="340"
              r="148"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="1.4"
            />
            <circle
              cx="340"
              cy="340"
              r="142"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />
            <circle
              cx="340"
              cy="340"
              r="100"
              fill="none"
              stroke="#c8d4e0"
              strokeWidth="0.6"
            />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              const ox = 340 + 142 * Math.cos(a),
                oy = 340 + 142 * Math.sin(a);
              const ix = 340 + 102 * Math.cos(a),
                iy = 340 + 102 * Math.sin(a);
              return (
                <g key={i}>
                  <line
                    x1={ox}
                    y1={oy}
                    x2={ix}
                    y2={iy}
                    stroke="#c8d4e0"
                    strokeWidth="0.6"
                    opacity="0.45"
                  />
                  <circle
                    cx={ox}
                    cy={oy}
                    r={i % 4 === 0 ? 4 : 2.5}
                    fill="#c8d4e0"
                  />
                </g>
              );
            })}
            <g fill="none" stroke="#c8d4e0" strokeWidth="0.65" opacity="0.65">
              <polyline points="330,258 348,272 338,292 356,308 340,320" />
              <polyline points="362,252 378,268 368,288 385,300" />
              <polyline points="408,310 425,328 415,348 432,362" />
              <polyline points="340,400 355,418 345,435 362,448" />
              <polyline points="260,365 245,382 255,398 240,412" />
              <polyline points="280,270 265,288 275,305 260,320" />
            </g>
            <g fill="#c8d4e0">
              {[
                [338, 264],
                [350, 288],
                [370, 260],
                [416, 320],
                [428, 352],
                [348, 410],
                [250, 375],
                [270, 280],
                [340, 193],
                [487, 340],
                [340, 487],
                [193, 340],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i > 8 ? 4 : 2} />
              ))}
            </g>
          </g>

          {/* 북극성 — 고정 */}
          <circle cx="340" cy="340" r="7" fill="#8fa4b8" />
          <circle
            cx="340"
            cy="340"
            r="14"
            fill="none"
            stroke="#8fa4b8"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <circle
            cx="340"
            cy="340"
            r="22"
            fill="none"
            stroke="#8fa4b8"
            strokeWidth="0.4"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* 기존 콘텐츠 */}
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
              <img src={`${tarot.cards[0]}.png`} alt="소울 카드" />
            </div>
            <div className="card-wrap">
              <span className="card-label">성격 카드</span>
              <img src={`${tarot.cards[1]}.png`} alt="성격 카드" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
