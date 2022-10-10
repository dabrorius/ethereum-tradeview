import React from "react";
import { DepthChart } from "./components/DepthChart";
import { OrderBook } from "./components/OrderBook";
import { TradeviewHeader } from "./components/TradeviewHeader";
import { useLiveTicker } from "./hooks/useLiveTicker";

function App() {
  const [lastPrice, highPrice, lowPrice] = useLiveTicker();

  return (
    <div className="App">
      <header className="App-header">
        <TradeviewHeader
          lastPrice={lastPrice}
          highPrice={highPrice}
          lowPrice={lowPrice}
        />
        <DepthChart lastPrice={lastPrice} />
        <OrderBook />
      </header>
    </div>
  );
}

export default App;
