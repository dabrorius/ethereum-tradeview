import styled from "@emotion/styled";
import { colors } from "../utils/colors";

type DepthChartControlsProps = {
  onZoomOutButtonClick: () => void;
  onZoomInButtonClick: () => void;
  lastPrice: number;
};

const DepthChartControlsInner = styled.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const DepthChartControlsButton = styled.button({
  color: colors.text,
  fontSize: 18,
  padding: "0 8px",
  border: "none",
  background: "none",
});

const DepthChartControlsTitle = styled.div({
  fontSize: 14,
});

export function DepthChartControls(props: DepthChartControlsProps) {
  const { onZoomInButtonClick, onZoomOutButtonClick, lastPrice } = props;
  return (
    <DepthChartControlsInner>
      <DepthChartControlsButton onClick={onZoomOutButtonClick}>
        -
      </DepthChartControlsButton>
      <DepthChartControlsTitle>${lastPrice}</DepthChartControlsTitle>
      <DepthChartControlsButton onClick={onZoomInButtonClick}>
        +
      </DepthChartControlsButton>
    </DepthChartControlsInner>
  );
}
