import type { tarotCard } from "../tarotControl";

export const handleShareUrl = async (
  page: string,
  category: string,
  cards: tarotCard[],
) => {
  const path = window.location.origin;
  await navigator.clipboard.writeText(
    `${path}?share=true&page=${page}&category=${category}&cards=${cards.map((item) => item.cardNum).join(",")}&upright=${cards.map((item) => item.upright).join(",")}`,
  );
};
