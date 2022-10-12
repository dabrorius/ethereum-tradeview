type DepthChartControlsProps = {
  onZoomOutButtonClick: () => void;
  onZoomInButtonClick: () => void;
  lastPrice: number;
};

export function DepthChartControls(props: DepthChartControlsProps) {
  const { onZoomInButtonClick, onZoomOutButtonClick, lastPrice } = props;
  return (
    <div className="absolute flex justify-center w-full">
      <div className="flex items-center">
        <button className="text-white text-xl" onClick={onZoomOutButtonClick}>
          -
        </button>
        <div className="text-white px-2">${lastPrice}</div>
        <button className="text-white text-xl" onClick={onZoomInButtonClick}>
          +
        </button>
      </div>
    </div>
  );
}
