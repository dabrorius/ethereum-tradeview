import { extent, maxIndex } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { TradeEntry } from "../hooks/useLiveTrades";
import { groupBy } from "lodash";
import { CandleChartCandle } from "./CandleChartCandle";
import { useRef } from "react";
import { Section } from "./Section";

type CandleChartProps = {
  trades: TradeEntry[];
};

export function CandleChart(props: CandleChartProps) {
  const { trades } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = svgRef.current?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

  const groupedTrades = groupBy(trades, (trade) => {
    const unixTimestamp = trade.date.getTime();
    const bucketSize = 15 * 60 * 1000;
    const bucketedTimestamp =
      Math.floor(unixTimestamp / bucketSize) * bucketSize;
    return bucketedTimestamp;
  });

  const candleData = Object.keys(groupedTrades)
    .sort()
    .map((key) => {
      const entries = groupedTrades[key];
      const prices = entries.map((d) => d.price);
      const [min = 0, max = 0] = extent(prices);
      const close = entries[maxIndex(entries, (d) => d.date.getTime())].price;

      return {
        min,
        max,
        close,
        date: new Date(parseFloat(key)),
      };
    });

  const prices = trades.map((d) => d.price);
  const [minPrice = 0, maxPrice = 0] = extent(prices);

  const dates = trades.map((d) => d.date);
  const [minDate = new Date(), maxDate = new Date()] = extent(dates);

  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([height, 0]);
  const scaleX = scaleTime().domain([minDate, maxDate]).range([0, width]);

  const candlePositions = candleData.map((d, index, array) => {
    const { close, min, max, date } = d;

    const openPrice = index > 0 ? array[index - 1].close : close;

    const candleHighValue = Math.max(openPrice, close);
    const candleLowValue = Math.min(openPrice, close);

    const candleTop = scaleY(candleLowValue);
    const candleBottom = scaleY(candleHighValue);
    const candleHeight = candleTop - candleBottom;

    const wickTop = scaleY(min);
    const wickBottom = scaleY(max);
    const wickHeight = wickTop - wickBottom;

    return {
      id: date.getTime(),
      x: scaleX(date),
      candleBottom,
      candleHeight,
      wickBottom,
      wickHeight,
      color: close > openPrice ? "green" : "red",
    };
  });

  return (
    <Section title="ETH/USD" gridArea="candles">
      <svg width="100%" ref={svgRef}>
        {candlePositions.map((c) => (
          <CandleChartCandle
            key={c.id}
            x={c.x}
            wickBottom={c.wickBottom}
            wickHeight={c.wickHeight}
            candleBottom={c.candleBottom}
            candleHeight={c.candleHeight}
            color={c.color}
          />
        ))}
      </svg>
    </Section>
  );
}
