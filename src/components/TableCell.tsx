import styled from "@emotion/styled";
import { colors } from "../utils/colors";

type TableCellProps = {
  type?: "primary" | "positive" | "negative";
  align?: "left" | "right";
};

export const TableCell = styled.td((props: TableCellProps) => {
  let color = colors.text;
  if (props.type === "positive") {
    color = colors.positive;
  } else if (props.type === "negative") {
    color = colors.negative;
  }

  return {
    fontSize: 12,
    padding: "0 8px",
    color,
    textAlign: props.align || "left",
  };
});
