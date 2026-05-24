import type { tarotCard, tarotRecord } from "../tarotControl";

export const handleClickHistory = (
  pastData: tarotRecord,
  setSelectedCards: React.Dispatch<React.SetStateAction<tarotCard[]>>,
  setFlipCards: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setSelectedCards(pastData.cards);
  setFlipCards(true);
};
