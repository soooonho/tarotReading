export default function TodayCard({
  selectedCard,
  cardNum,
  tarotOnClick,
}: {
  selectedCard: number;
  cardNum: number;
  tarotOnClick: (cardNum: number) => void;
}) {
  return (
    <>
      <button
        value={cardNum}
        onClick={() => tarotOnClick(cardNum)}
        disabled={selectedCard !== -1}
        style={{
          display: selectedCard === -1 ? "block" : "none",
        }}
      >
        <img
          src={selectedCard === cardNum ? `${cardNum}.png` : "0.png"}
          alt="소울 카드"
          style={{ width: "100px", height: "auto" }}
        />
      </button>
    </>
  );
}
