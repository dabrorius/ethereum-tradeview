import styled from "@emotion/styled";
import { colors } from "../utils/colors";

type TableHeaderProps = {
  align?: "left" | "right";
};

export const TableHeader = styled.th((props: TableHeaderProps) => ({
  fontWeight: "normal",
  fontSize: 12,
  textAlign: props.align || "left",
  padding: "0 8px",
  color: colors.text2,
}));
