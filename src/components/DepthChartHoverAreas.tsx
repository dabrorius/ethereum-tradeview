import { ScaleLinear } from "d3-scale";
import { CumulativeBookEntry } from "./DepthChart";

type DepthChartHoverAreasProps = {
  bids: CumulativeBookEntry[];
  height: number;
  scaleX: ScaleLinear<number, number, any>;
  onMouseEnter: (d: CumulativeBookEntry) => void;
  onMouseLeave: () => void;
};

export function DepthChartHoverAreas(props: DepthChartHoverAreasProps) {
  const { bids, height, scaleX, onMouseEnter, onMouseLeave } = props;

  const hoverAreas = bids.map((current, index, array) => {
    const previous = index === 0 ? current : array[index - 1];
    const next = index === array.length - 1 ? current : array[index + 1];

    const [smallNeighbour, bigNeighbour] =
      previous.value < next.value ? [previous, next] : [next, previous];

    const topEdgeValue: number =
      current.value + (bigNeighbour.value - current.value) / 2;
    const botEdgeValue: number =
      current.value - (current.value - smallNeighbour.value) / 2;

    return {
      datum: current,
      key: `${current.value}-${current.amount}`,
      x: scaleX(botEdgeValue),
      width: scaleX(topEdgeValue) - scaleX(botEdgeValue),
    };
  });

  return (
    <g>
      {hoverAreas.map((hoverArea) => (
        <rect
          key={hoverArea.key}
          opacity="0"
          x={hoverArea.x}
          width={hoverArea.width}
          y={0}
          height={height}
          onMouseEnter={() => onMouseEnter(hoverArea.datum)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </g>
  );
}
