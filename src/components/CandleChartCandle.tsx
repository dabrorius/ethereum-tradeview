type CandleChartCandleProps = {
  x: number;
  wickBottom: number;
  wickHeight: number;
  candleBottom: number;
  candleHeight: number;
  color: string;
};

export function CandleChartCandle(props: CandleChartCandleProps) {
  const { x, wickBottom, wickHeight, candleBottom, candleHeight, color } =
    props;

  const candleWidth = 7;

  return (
    <g>
      <rect x={x} y={wickBottom} width="1" height={wickHeight} fill={color} />
      <rect
        x={x - Math.floor(candleWidth / 2)}
        y={candleBottom}
        width={candleWidth}
        height={candleHeight}
        fill={color}
      />
    </g>
  );
}
