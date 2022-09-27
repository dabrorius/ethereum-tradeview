import React from "react";

import { useOrderBook } from "../hooks/useOrderBook";
import { TableStyled } from "./TableStyled";

export function OrderBook() {
  const [bids, asks] = useOrderBook();

  return (
    <div>
      Order Book
      <div style={{ display: "flex" }}>
        <TableStyled data={bids} />
        <TableStyled data={asks} />
      </div>
    </div>
  );
}
