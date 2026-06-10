import { useState } from "react";
import SoulCard from "./SoulCard";
import History from "./History";
import Normal from "./Normal";
import Daily from "./Daily";
import "../Tarot.css";
import Background from "./Background";

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
      <Background />
      <div className="app">
        <nav className="nav-container">
          <button
            className={`nav-item ${currentPage === "main" ? "active" : ""}`}
            value="main"
            onClick={pageHandler}
          >
            메인
          </button>
          <button
            className={`nav-item ${currentPage === "soul" ? "active" : ""}`}
            value="soul"
            onClick={pageHandler}
          >
            소울카드
          </button>
          <button
            className={`nav-item ${currentPage === "today" ? "active" : ""}`}
            value="today"
            onClick={pageHandler}
          >
            오늘의운세
          </button>
          <button
            className={`nav-item ${currentPage === "normal" ? "active" : ""}`}
            value="normal"
            onClick={pageHandler}
          >
            일반운세
          </button>
          <button
            className={`nav-item ${currentPage === "history" ? "active" : ""}`}
            value="history"
            onClick={pageHandler}
          >
            과거이력조회
          </button>
        </nav>

        {currentPage == "main" && <h1>App Component</h1>}
        {currentPage == "soul" && <SoulCard />}
        {currentPage == "today" && <Daily />}
        {currentPage == "normal" && <Normal />}
        {currentPage == "history" && <History />}
      </div>
    </>
  );
}
