import React from "react";
import { DepthChart } from "./components/DepthChart";
import { OrderBook } from "./components/OrderBook";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DepthChart />
        <OrderBook />
      </header>
    </div>
  );
}

export default App;
