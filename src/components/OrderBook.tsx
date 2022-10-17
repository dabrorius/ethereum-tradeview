import styled from "@emotion/styled";
import React from "react";

import { useOrderBook } from "../hooks/useOrderBook";
import { Section } from "./Section";
import { TableAsks } from "./TableAsks";
import { TableBids } from "./TableBids";

const TablesLayout = styled.div({
  display: "flex",
  width: "100%",
});

export function OrderBook() {
  const [bids, asks] = useOrderBook();

  return (
    <Section title="Order book" gridArea="orders">
      <TablesLayout>
        <TableBids data={bids} />
        <TableAsks data={asks} />
      </TablesLayout>
    </Section>
  );
}
