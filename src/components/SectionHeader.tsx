import styled from "@emotion/styled";
import { colors } from "../utils/colors";

type SectionHeaderProps = {
  title: string;
};

const SectionHeaderInner = styled.div({
  color: colors.text2,
  fontSize: 12,
  textTransform: "uppercase",
  padding: "2px 8px",
  background: colors.headerBackground,
  borderTop: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.border}`,
});

export function SectionHeader({ title }: SectionHeaderProps) {
  return <SectionHeaderInner>{title}</SectionHeaderInner>;
}
