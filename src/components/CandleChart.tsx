import { extent, maxIndex, minIndex } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { TradeEntry } from "../hooks/useLiveTrades";
import { groupBy } from "lodash";

type CandleChartProps = {
  trades: TradeEntry[];
};

export function CandleChart(props: CandleChartProps) {
  const { trades } = props;

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

  const width = 1400;
  const height = 200;

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
    };
  });

  return (
    <svg width="100%" height="200">
      {candlePositions.map((c) => (
        <g key={c.id}>
          <rect
            x={c.x}
            y={c.wickBottom}
            width="1"
            height={c.wickHeight}
            fill="yellow"
          />
          <rect
            x={c.x}
            y={c.candleBottom}
            width="6"
            height={c.candleHeight}
            fill="red"
            onMouseDown={() => console.log(c)}
          />
        </g>
      ))}
    </svg>
  );
}
