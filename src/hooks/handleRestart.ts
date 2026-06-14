import { getShuffledDeck, type tarotCard } from "../tarotControl";

export const handleRestart = (
  setSelectedCards: React.Dispatch<React.SetStateAction<tarotCard[]>>,
  setFlipCards: React.Dispatch<React.SetStateAction<boolean>>,
  setDeck: React.Dispatch<
    React.SetStateAction<{ cardNum: number; upright: boolean }[]>
  >,
) => {
  setDeck(getShuffledDeck());
  setFlipCards(false);
  setSelectedCards([]);
  const newUrl = window.location.origin;
  window.history.replaceState({}, "", newUrl);
};
