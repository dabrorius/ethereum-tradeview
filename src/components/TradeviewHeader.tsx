import styled from "@emotion/styled";
import { colors } from "../utils/colors";
import { TradeviewHeaderItem } from "./TradeviewHeaderItem";

type TradeviewHeaderProps = {
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
};

const TradeviewHeaderInner = styled.div({
  display: "flex",
  alignItems: "center",
  padding: 8,
});

const HeaderTitle = styled.h1({
  color: colors.text,
  fontSize: 22,
  marginRight: 8,
});

const LastPriceSection = styled.div({
  margin: "0 8px",
});

export function TradeviewHeader(props: TradeviewHeaderProps) {
  const { lastPrice, highPrice, lowPrice } = props;

  return (
    <TradeviewHeaderInner style={{ gridArea: "header" }}>
      <HeaderTitle>ETH Tradeview</HeaderTitle>
      <LastPriceSection>{`$${lastPrice}`}</LastPriceSection>
      <TradeviewHeaderItem title="24h High">
        {`$${highPrice}`}
      </TradeviewHeaderItem>
      <TradeviewHeaderItem title="24h Low">
        {`$${lowPrice}`}
      </TradeviewHeaderItem>
    </TradeviewHeaderInner>
  );
}
