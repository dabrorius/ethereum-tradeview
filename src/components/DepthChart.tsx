// import { useOrderBook } from "../hooks/useOrderBook";
import { scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { BitstampHttpClient } from "../api/BitstampHttpClient";
import { useEffect, useRef, useState } from "react";
import { OrderBookEntry } from "../api/BitstampSocketClient";
import { line } from "d3-shape";

type CumulativeBookEntry = {
  sum: number;
  value: number;
  amount: number;
};

function parseAndCumulate(entries: OrderBookEntry[]): CumulativeBookEntry[] {
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

  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = svgRef.current?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

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

  const scaleX = scaleLinear().domain(valuesExtent).range([0, width]);

  const bidAmounts = cumulativeBids.map((bid) => bid.sum);
  const askAmounts = cumulativeAsks.map((ask) => ask.sum);
  const amounts = bidAmounts.concat(askAmounts);
  const maxAmount = max(amounts) || 0;

  const scaleY = scaleLinear().domain([0, maxAmount]).range([height, 0]);

  const lineDatagGenerator = line<CumulativeBookEntry>()
    .x((d) => scaleX(d.value))
    .y((d) => scaleY(d.sum));

  return (
    <svg width="100%" height="200" ref={svgRef}>
      <path
        d={lineDatagGenerator(cumulativeBids) || undefined}
        stroke="green"
        fill="none"
      />
      <path
        d={lineDatagGenerator(cumulativeAsks) || undefined}
        stroke="red"
        fill="none"
      />
    </svg>
  );
}
