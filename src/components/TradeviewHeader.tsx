import { TradeviewHeaderItem } from "./TradeviewHeaderItem";

type TradeviewHeaderProps = {
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
};

export function TradeviewHeader(props: TradeviewHeaderProps) {
  const { lastPrice, highPrice, lowPrice } = props;

  return (
    <div
      style={{ gridArea: "header" }}
      className="text-slate-50 flex items-center px-2 py-1"
    >
      <h1 className="text-xl mr-4">ETH Tradeview</h1>
      <div className="mx-3 ">{`$${lastPrice}`}</div>
      <TradeviewHeaderItem title="24h High">
        {`$${highPrice}`}
      </TradeviewHeaderItem>
      <TradeviewHeaderItem title="24h Low">
        {`$${lowPrice}`}
      </TradeviewHeaderItem>
    </div>
  );
}
