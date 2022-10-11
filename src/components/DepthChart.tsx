import { scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { BitstampHttpClient } from "../api/BitstampHttpClient";
import { useEffect, useRef, useState } from "react";
import { OrderBookEntry } from "../api/BitstampSocketClient";
import { area, line } from "d3-shape";
import { SectionHeader } from "./SectionHeader";
import { DepthChartControls } from "./DepthChartControls";
import { DepthChartHoverAreas } from "./DepthChartHoverAreas";

export type CumulativeBookEntry = {
  sum: number;
  value: number;
  amount: number;
};

type HoveredDatumInfo = {
  datum: CumulativeBookEntry;
  type: "bid" | "ask";
};

function parseAndCumulate(
  entries: OrderBookEntry[],
  lowLimit: number,
  highLimit: number
): CumulativeBookEntry[] {
  let sum = 0;
  return entries
    .map(([valueString, amountString]) => ({
      value: parseFloat(valueString),
      amount: parseFloat(amountString),
    }))
    .filter((entry) => entry.value > lowLimit && entry.value < highLimit)
    .map((entry) => {
      sum += entry.amount;
      return { ...entry, sum };
    });
}

const orderBookFetchInterval = 2000;

type DepthChartProps = {
  lastPrice: number;
};

export function DepthChart(props: DepthChartProps) {
  const { lastPrice } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = svgRef.current?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

  const [hoveredDatum, setHoveredDatum] = useState<HoveredDatumInfo | null>(
    null
  );

  const [zoomLevel, setZoomLevel] = useState(0.1);
  const highLimit = lastPrice * (1 + zoomLevel);
  const lowLimit = lastPrice * (1 - zoomLevel);
  const canZoomIn = zoomLevel > 0.01;
  const canZoomOut = zoomLevel < 1;
  const zoomIn = () => canZoomIn && setZoomLevel(zoomLevel / 2);
  const zoomOut = () => canZoomOut && setZoomLevel(zoomLevel * 2);

  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const cumulativeBids = parseAndCumulate(bids, lowLimit, highLimit);

  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const cumulativeAsks = parseAndCumulate(asks, lowLimit, highLimit);

  const fetchBidsAndAsks = () => {
    BitstampHttpClient.fetchOrderBook()
      .then((response) => {
        setBids(response.data.bids);
        setAsks(response.data.asks);
      })
      .catch((error) => {
        console.error("Error occured when fetching order book", error);
      });
  };

  useEffect(() => {
    fetchBidsAndAsks();
    const interval = setInterval(fetchBidsAndAsks, orderBookFetchInterval);
    return () => clearInterval(interval);
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

  const scaleY = scaleLinear()
    .domain([0, maxAmount * 1.3])
    .range([height, 0]);

  const lineDataGenerator = line<CumulativeBookEntry>()
    .x((d) => scaleX(d.value))
    .y((d) => scaleY(d.sum));

  const areaDataGenerator = area<CumulativeBookEntry>()
    .x((d) => scaleX(d.value))
    .y0(() => height)
    .y1((d) => scaleY(d.sum));

  return (
    <div className="bg-slate-800">
      <SectionHeader title="Depth Chart" />
      <DepthChartControls
        lastPrice={lastPrice}
        onZoomInButtonClick={zoomIn}
        onZoomOutButtonClick={zoomOut}
      />
      <div className="relative">
        {hoveredDatum && (
          <div
            className="absolute text-yellow-50 text-sm px-2"
            style={{ left: scaleX(hoveredDatum.datum.value) }}
          >
            <p>{`$${hoveredDatum.datum.value}`}</p>
            <p>{hoveredDatum.datum.sum}</p>
          </div>
        )}

        <svg width="100%" height="200" ref={svgRef}>
          <path
            d={lineDataGenerator(cumulativeBids) || undefined}
            stroke="green"
            fill="none"
          />
          <path
            d={areaDataGenerator(cumulativeBids) || undefined}
            stroke="none"
            fill="green"
            opacity="0.3"
          />
          <path
            d={lineDataGenerator(cumulativeAsks) || undefined}
            stroke="red"
            fill="none"
          />
          <path
            d={areaDataGenerator(cumulativeAsks) || undefined}
            stroke="none"
            fill="red"
            opacity="0.3"
          />

          <DepthChartHoverAreas
            bids={cumulativeBids}
            height={height}
            scaleX={scaleX}
            onMouseEnter={(datum) => setHoveredDatum({ datum, type: "bid" })}
            onMouseLeave={() => setHoveredDatum(null)}
          />

          <DepthChartHoverAreas
            bids={cumulativeAsks}
            height={height}
            scaleX={scaleX}
            onMouseEnter={(datum) => setHoveredDatum({ datum, type: "ask" })}
            onMouseLeave={() => setHoveredDatum(null)}
          />

          {hoveredDatum && (
            <line
              className="pointer-events-none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.3"
              x1={scaleX(hoveredDatum.datum.value)}
              y1={0}
              x2={scaleX(hoveredDatum.datum.value)}
              y2={height}
            />
          )}

          {hoveredDatum && (
            <circle
              className="pointer-events-none"
              fill={hoveredDatum.type === "bid" ? "green" : "red"}
              r={4}
              cx={scaleX(hoveredDatum.datum.value)}
              cy={scaleY(hoveredDatum.datum.sum)}
            />
          )}
        </svg>
      </div>
    </div>
  );
}
