export type tarotCard = {
  cardNum: number;
  upright: boolean;
};
export type tarotRecord = {
  cards: tarotCard[];
  date: string;
};
export const shuffle = (arr: tarotCard[]) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};
export const getCardDirection = () => {
  return Math.random() > 0.5;
};
export const getShuffledDeck = () => {
  const deck = Array(22);
  for (let i = 0; i < 22; i++) {
    deck[i] = { cardNum: i, upright: getCardDirection() };
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};
export const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const saveTarotCards = (cards: tarotCard[], category: string) => {
  const today = getToday();
  const history = JSON.parse(localStorage.getItem(category) || "[]");
  const filteredHistory = history.filter(
    (item: tarotRecord) => item.date !== today,
  );
  localStorage.setItem(
    category,
    JSON.stringify([{ cards: cards, date: today }, ...filteredHistory]),
  );
};
