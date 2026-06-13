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
    let page = params.get("page");
    const category = params.get("category");
    page = category === "love" || category === "money" ? category : page;
    if (page) return page;
    else return "main";
  });
  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
  };
  // 일반 운세에서 드롭다운의 열림/닫힘 상태를 관리하는 State
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlepage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 250);
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    setTimeout(() => setIsOpen(true), 10); // 렌더 직후 open 클래스 부여
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // fade-out 시작
    setTimeout(() => setIsVisible(false), 250); // 애니메이션 끝나면 DOM 제거
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
            className={`nav-item ${currentPage === "daily" ? "active" : ""}`}
            value="daily"
            onClick={pageHandler}
          >
            오늘의운세
          </button>

          <div
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} //마우스가 내려갔을 때
          >
            <button
              className={`nav-item ${["info", "love", "money"].includes(currentPage) ? "active" : ""}`}
              value="normal"
              onClick={pageHandler}
            >
              일반운세
            </button>
            {isVisible && (
              <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
                <a>
                  <button
                    className={`nav-item ${currentPage === "love" ? "active" : ""}`}
                    value="love"
                    onClick={handlepage}
                  >
                    연애운
                  </button>
                </a>
                <a>
                  <button
                    className={`nav-item ${currentPage === "money" ? "active" : ""}`}
                    value="money"
                    onClick={handlepage}
                  >
                    금전운
                  </button>
                </a>
              </div>
            )}
          </div>
          <button
            className={`nav-item ${currentPage === "history" ? "active" : ""}`}
            value="history"
            onClick={pageHandler}
          >
            과거이력조회
          </button>
        </nav>
        {currentPage == "main" && (
          <>
            <h1>ARCANA</h1>
            <p>
              복잡한 고민 속에서 길을 잃었을 때, 타로가 건네는 다정한 조언을
              들어보세요
            </p>
          </>
        )}
        {currentPage == "soul" && <SoulCard />}
        {currentPage == "daily" && <Daily />}
        {(currentPage == "normal" ||
          currentPage == "love" ||
          currentPage == "money") && (
          <Normal
            currentPage={currentPage === "normal" ? "info" : currentPage}
          />
        )}
        {currentPage == "history" && <History />}
      </div>
    </>
  );
}
