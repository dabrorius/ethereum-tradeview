import React from "react";

import { useOrderBook } from "../hooks/useOrderBook";
import { SectionHeader } from "./SectionHeader";
import { TableAsks } from "./TableAsks";
import { TableBids } from "./TableBids";

export function OrderBook() {
  const [bids, asks] = useOrderBook();

  return (
    <div className="bg-gray-900">
      <SectionHeader title="Order book" />
      <div className="overflow-scroll" style={{ height: 400 }}>
        <div className="flex">
          <TableBids data={bids} />
          <TableAsks data={asks} />
        </div>
      </div>
    </div>
  );
}
