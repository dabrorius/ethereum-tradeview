import styled from "@emotion/styled";
import { ReactElement } from "react";
import { colors } from "../utils/colors";

type TradeviewHeaderItemProps = {
  title: string;
  children: string | ReactElement;
};

const TradeviewHeaderItemInner = styled.div({
  margin: "0 16px",
});

const TradeviewHeaderItemTitle = styled.div({
  fontSize: 10,
  color: colors.text2,
});

const TradeviewHeaderItemContent = styled.div({
  fontSize: 12,
  color: colors.text,
});

export function TradeviewHeaderItem({
  title,
  children,
}: TradeviewHeaderItemProps) {
  return (
    <TradeviewHeaderItemInner>
      <TradeviewHeaderItemTitle>{title}</TradeviewHeaderItemTitle>
      <TradeviewHeaderItemContent>{children}</TradeviewHeaderItemContent>
    </TradeviewHeaderItemInner>
  );
}
