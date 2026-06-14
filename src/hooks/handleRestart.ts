import type { tarotCard } from "../tarotControl";

export const handleRestart = (
  setSelectedCards: React.Dispatch<React.SetStateAction<tarotCard[]>>,
  setFlipCards: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setFlipCards(false);
  setSelectedCards([]);
  const newUrl = window.location.origin;
  window.history.replaceState({}, "", newUrl);
};
