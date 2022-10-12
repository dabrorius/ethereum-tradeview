import React, { CSSProperties } from "react";
import { CandleChart } from "./components/CandleChart";
import { DepthChart } from "./components/DepthChart";
import { OrderBook } from "./components/OrderBook";
import { TableTrades } from "./components/TableTrades";
import { TradeviewHeader } from "./components/TradeviewHeader";
import { useLiveTicker } from "./hooks/useLiveTicker";
import { useLiveTrades } from "./hooks/useLiveTrades";

function App() {
  const [lastPrice, highPrice, lowPrice] = useLiveTicker();
  const trades = useLiveTrades();

  const styles: CSSProperties = {
    display: "grid",
    gridTemplateAreas: `
      "header header header  header  header  header"
      "trades trades candles candles candles candles"
      "depth  depth  depth   orders  orders  orders"
    `,
    gridTemplateRows: "auto minmax(0, 2fr) minmax(0, 1fr)",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  return (
    <div style={styles}>
      <TradeviewHeader
        lastPrice={lastPrice}
        highPrice={highPrice}
        lowPrice={lowPrice}
      />
      <TableTrades trades={trades} />
      <CandleChart trades={trades} />
      <DepthChart lastPrice={lastPrice} />
      <OrderBook />
    </div>
  );
}

export default App;
