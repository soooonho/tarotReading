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
  const handlepage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(e.currentTarget.value);
  };
  return (
    <>
      <div className="app">
        <button value="love" onClick={handlepage}>
          연애운
        </button>
        <button value="money" onClick={handlepage}>
          금전운
        </button>
        {currentPage == "main" && <h1>Normal Component</h1>}
        {currentPage == "money" && <Money />}
        {currentPage == "love" && <Love />}
      </div>
    </>
  );
}
