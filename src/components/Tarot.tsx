import { useState } from "react";
import Bcakground from "./Bcakground";
import SoulCard from "./SoulCard";
import Today from "./Today";
import History from "./History";
import Normal from "./Normal";

export default function Tarot() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page) return page;
    else return "main";
  });
  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
  };
  return (
    <>
      <div className="app">
        <Bcakground />
        <button value="main" onClick={pageHandler}>
          메인
        </button>
        <button value="soul" onClick={pageHandler}>
          소울카드
        </button>
        <button value="today" onClick={pageHandler}>
          오늘의운세
        </button>
        <button value="normal" onClick={pageHandler}>
          일반운세
        </button>
        <button value="history" onClick={pageHandler}>
          과거이력조회
        </button>
        {currentPage == "main" && <h1>App Component</h1>}
        {currentPage == "soul" && <SoulCard />}
        {currentPage == "today" && <Today />}
        {currentPage == "normal" && <Normal />}
        {currentPage == "history" && <History />}
      </div>
    </>
  );
}
