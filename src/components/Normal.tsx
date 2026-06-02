import { useState } from "react";
import Money from "./Money";
import Love from "./Love";

import "../Tarot.css";

export default function Normal() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) return category;
    else return "main";
  });
  const handlepage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
  };
  return (
    <>
      <div className="app">
        <nav className="nav-container">
          <button
            className={`nav-item ${currentPage === "love" ? "active" : ""}`}
            value="love"
            onClick={handlepage}
          >
            연애운
          </button>
          <button
            className={`nav-item ${currentPage === "money" ? "active" : ""}`}
            value="money"
            onClick={handlepage}
          >
            금전운
          </button>
        </nav>
        {currentPage == "main" && <h1>Normal Component</h1>}
        {currentPage == "money" && <Money />}
        {currentPage == "love" && <Love />}
      </div>
    </>
  );
}
