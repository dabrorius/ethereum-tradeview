// import { useOrderBook } from "../hooks/useOrderBook";
import { scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { BitstampHttpClient } from "../api/BitstampHttpClient";
import { useEffect, useState } from "react";
import { OrderBookEntry } from "../api/BitstampSocketClient";

function parseAndCumulate(entries: OrderBookEntry[]) {
  let sum = 0;
  return entries
    .map(([valueString, amountString]) => ({
      value: parseFloat(valueString),
      amount: parseFloat(amountString),
    }))
    .filter((entry) => entry.value > 900 && entry.value < 2000)
    .map((entry) => {
      sum += entry.amount;
      return { ...entry, sum };
    });
}

export function DepthChart() {
  // const [bids, asks] = useOrderBook();

  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const cumulativeBids = parseAndCumulate(bids);

  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const cumulativeAsks = parseAndCumulate(asks);

  useEffect(() => {
    BitstampHttpClient.fetchOrderBook().then((response) => {
      setBids(response.data.bids);
      setAsks(response.data.asks);
    });
  }, []);

  const bidValues = cumulativeBids.map((bid) => bid.value);
  const askValues = cumulativeAsks.map((ask) => ask.value);
  const values = bidValues.concat(askValues);
  const valuesExtent = extent(values) as [number, number];
  console.log(values, valuesExtent);

  const scaleX = scaleLinear().domain(valuesExtent).range([0, 100]);

  const bidAmounts = cumulativeBids.map((bid) => bid.sum);
  const askAmounts = cumulativeAsks.map((ask) => ask.sum);
  const amounts = bidAmounts.concat(askAmounts);
  const maxAmount = max(amounts) || 0;

  const scaleY = scaleLinear().domain([0, maxAmount]).range([200, 0]);

  return (
    <svg width="100%" height="200">
      {cumulativeBids.map(({ value, sum }) => (
        <circle
          key={`${value}-${sum}`}
          cx={`${scaleX(value)}%`}
          cy={scaleY(sum)}
          r="1"
          fill="green"
        />
      ))}
      {cumulativeAsks.map(({ value, sum }) => (
        <circle
          key={`${value}-${sum}`}
          cx={`${scaleX(value)}%`}
          cy={scaleY(sum)}
          r="1"
          fill="red"
        />
      ))}
    </svg>
  );
}
