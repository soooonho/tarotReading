import Money from "./Money";
import Love from "./Love";
import "../Tarot.css";
import NormalInfo from "./NormalInfo";

interface NormalProps {
  currentPage: string;
}

export default function Normal({ currentPage }: NormalProps) {
  return (
    <>
      {currentPage == "info" && <NormalInfo />}
      {currentPage == "love" && <Love />}
      {currentPage == "money" && <Money />}
    </>
  );
}
