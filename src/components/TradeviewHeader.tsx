type TradeviewHeaderProps = {
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
};

export function TradeviewHeader(props: TradeviewHeaderProps) {
  const { lastPrice, highPrice, lowPrice } = props;

  return (
    <div className="text-slate-50">
      Header is here
      <p>{`$${lastPrice}`}</p>
      <p>{`$${highPrice}`}</p>
      <p>{`$${lowPrice}`}</p>
    </div>
  );
}
