import { useState } from "react";
import Money from "./Money";
import Love from "./Love";

export default function Normal() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) return category;
    else return "main";
  });
  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
  };
  return (
    <>
      <div className="app">
        <button value="love" onClick={pageHandler}>
          연애운
        </button>
        <button value="money" onClick={pageHandler}>
          금전운
        </button>
        {currentPage == "main" && <h1>Normal Component</h1>}
        {currentPage == "money" && <Money />}
        {currentPage == "love" && <Love />}
      </div>
    </>
  );
}
