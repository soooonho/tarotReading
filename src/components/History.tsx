import { useState } from "react";
import ShowCards from "./ShowCards";
import moneyTarotDataRaw from "../assets/data/moneyTarotData.json";
import loveTarotDataRaw from "../assets/data/loveTarotData.json";
import dailyTarotDataRaw from "../assets/data/dailyTarotData.json";
import ShowDailyCard from "./ShowDailyCard";

export default function History() {
  const [selectedHistory, setSelectedHistory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dailyHistory = JSON.parse(localStorage.getItem("daily") || "[]");
  const loveHistory = JSON.parse(localStorage.getItem("love") || "[]");
  const moneyHistory = JSON.parse(localStorage.getItem("money") || "[]");

  const dates = [
    ...dailyHistory.map((item) => item.date),
    ...loveHistory.map((item) => item.date),
    ...moneyHistory.map((item) => item.date),
  ];
  const uniqueDates = Array.from(new Set(dates)).sort((a, b) =>
    b.localeCompare(a),
  );

  const handleClickCategory = (date: string, category: string) => {
    if (selectedHistory === date && selectedCategory === category) {
      // 같은 버튼 다시 누르면 닫기
      setSelectedHistory("");
      setSelectedCategory("");
    } else {
      setSelectedHistory(date);
      setSelectedCategory(category);
    }
  };

  const getSelectedCards = () => {
    if (!selectedHistory || !selectedCategory) return null;
    if (selectedCategory === "daily")
      return dailyHistory.find((item) => item.date === selectedHistory)?.cards;
    if (selectedCategory === "love")
      return loveHistory.find((item) => item.date === selectedHistory)?.cards;
    if (selectedCategory === "money")
      return moneyHistory.find((item) => item.date === selectedHistory)?.cards;
    return null;
  };

  const selectedCards = getSelectedCards();

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
        padding: "24px",
        paddingTop: "90px",
      }}
    >
      {/* 왼쪽: 날짜 리스트 */}
      {uniqueDates.length > 0 ? (
        <ul
          className="history-list"
          style={{ listStyle: "none", padding: 0, minWidth: "160px" }}
        >
          {uniqueDates.map((date) => (
            <li key={date} style={{ marginBottom: "16px" }}>
              <p style={{ marginBottom: "8px", color: "var(--silver)" }}>
                {date}
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {dailyHistory.some((h) => h.date === date) && (
                  <button
                    value="daily"
                    onClick={() => handleClickCategory(date, "daily")}
                    style={{
                      background:
                        selectedHistory === date && selectedCategory === "daily"
                          ? "var(--silver)"
                          : "transparent",
                      color:
                        selectedHistory === date && selectedCategory === "daily"
                          ? "var(--bg)"
                          : "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    오늘의 운세
                  </button>
                )}
                {loveHistory.some((h) => h.date === date) && (
                  <button
                    value="love"
                    onClick={() => handleClickCategory(date, "love")}
                    style={{
                      background:
                        selectedHistory === date && selectedCategory === "love"
                          ? "var(--silver)"
                          : "transparent",
                      color:
                        selectedHistory === date && selectedCategory === "love"
                          ? "var(--bg)"
                          : "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    연애
                  </button>
                )}
                {moneyHistory.some((h) => h.date === date) && (
                  <button
                    value="money"
                    onClick={() => handleClickCategory(date, "money")}
                    style={{
                      background:
                        selectedHistory === date && selectedCategory === "money"
                          ? "var(--silver)"
                          : "transparent",
                      color:
                        selectedHistory === date && selectedCategory === "money"
                          ? "var(--bg)"
                          : "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    금전
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>기록 없음</p>
      )}

      {/* 오른쪽: 결과 박스 */}
      {selectedCards && (
        <div className="history-box">
          {selectedCategory === "daily" && (
            <ShowDailyCard
              page="history"
              category="daily"
              rawData={dailyTarotDataRaw}
              selectedCards={selectedCards}
              again={false}
              share={true}
            />
          )}
          {selectedCategory === "love" && (
            <ShowCards
              page="history"
              category="love"
              rawData={loveTarotDataRaw}
              selectedCards={selectedCards}
              again={false}
              share={true}
            />
          )}
          {selectedCategory === "money" && (
            <ShowCards
              page="history"
              category="money"
              rawData={moneyTarotDataRaw}
              selectedCards={selectedCards}
              again={false}
              share={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
