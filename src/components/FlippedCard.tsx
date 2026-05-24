interface CardProps extends React.ComponentPropsWithRef<"button"> {
  cardNum: number;
  upright: boolean;
}

export default function FlippedCard(props: CardProps) {
  const { cardNum, upright, ...rest } = props;
  return (
    <>
      <button {...rest}>
        <img
          src={`${cardNum}.png`}
          style={
            upright
              ? { width: "100px", height: "auto" }
              : { width: "100px", height: "auto", transform: "rotate(180deg)" }
          }
        />
      </button>
    </>
  );
}
