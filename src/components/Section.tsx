import styled from "@emotion/styled";
import { ReactElement } from "react";
import { colors } from "../utils/colors";
import { SectionHeader } from "./SectionHeader";

type SectionProps = {
  title: string;
  children: string | ReactElement | ReactElement[];
  gridArea: string;
};

const SectionInner = styled.div({
  display: "flex",
  flexDirection: "column",
  background: colors.background,
});

const SectionScrollable = styled.div({
  overflow: "scroll",
  display: "flex",
  flexGrow: 1,
});

export function Section(props: SectionProps) {
  const { title, children, gridArea } = props;

  return (
    <SectionInner style={{ gridArea }}>
      <SectionHeader title={title} />
      <SectionScrollable>{children}</SectionScrollable>
    </SectionInner>
  );
}
