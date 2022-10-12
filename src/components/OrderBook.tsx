import React from "react";

import { useOrderBook } from "../hooks/useOrderBook";
import { Section } from "./Section";
import { TableAsks } from "./TableAsks";
import { TableBids } from "./TableBids";

export function OrderBook() {
  const [bids, asks] = useOrderBook();

  return (
    <Section title="Order book" gridArea="orders">
      <div className="flex">
        <TableBids data={bids} />
        <TableAsks data={asks} />
      </div>
    </Section>
  );
}
