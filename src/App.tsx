import React from "react";
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

  return (
    <div className="App">
      <header className="App-header">
        <TradeviewHeader
          lastPrice={lastPrice}
          highPrice={highPrice}
          lowPrice={lowPrice}
        />
        <TableTrades trades={trades} />
        <CandleChart trades={trades} />
        <DepthChart lastPrice={lastPrice} />
        <OrderBook />
      </header>
    </div>
  );
}

export default App;
