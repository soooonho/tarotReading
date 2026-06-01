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
  const handleClickHistory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedHistory(e.currentTarget.innerText);
  };
  const handleClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.value);
  };
  return (
    <>
      {uniqueDates.length > 0 ? (
        <ul>
          {uniqueDates.map((date) => (
            <li key={date}>
              <button onClick={handleClickHistory}>{date}</button>
              {dailyHistory.some((h) => h.date === date) && <p>오늘의 운세</p>}
              {loveHistory.some((h) => h.date === date) && <p>연애</p>}
              {moneyHistory.some((h) => h.date === date) && <p>금전</p>}
              {selectedHistory === date && (
                <>
                  {dailyHistory.some((h) => h.date === date) && (
                    <>
                      <button value="daily" onClick={handleClickCategory}>
                        오늘의 운세
                      </button>
                      {selectedCategory === "daily" && (
                        <ShowDailyCard
                          page="normal"
                          category="daily"
                          rawData={dailyTarotDataRaw}
                          selectedCards={
                            dailyHistory.find((item) => item.date === date)
                              .cards
                          }
                          again={false}
                          share={true}
                        />
                      )}
                    </>
                  )}
                  {loveHistory.some((h) => h.date === date) && (
                    <>
                      <button value="love" onClick={handleClickCategory}>
                        연애
                      </button>
                      {selectedCategory === "love" && (
                        <ShowCards
                          page="normal"
                          category="love"
                          rawData={loveTarotDataRaw}
                          selectedCards={
                            loveHistory.find((item) => item.date === date).cards
                          }
                          again={false}
                          share={true}
                        />
                      )}
                    </>
                  )}
                  {moneyHistory.some((h) => h.date === date) && (
                    <>
                      <button value="money" onClick={handleClickCategory}>
                        금전
                      </button>
                      {selectedCategory === "money" && (
                        <ShowCards
                          page="normal"
                          category="money"
                          rawData={moneyTarotDataRaw}
                          selectedCards={
                            moneyHistory.find((item) => item.date === date)
                              .cards
                          }
                          again={false}
                          share={true}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>기록 없음</p>
      )}
    </>
  );
}
