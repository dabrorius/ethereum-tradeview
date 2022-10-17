import { TradeEntry } from "../hooks/useLiveTrades";
import { currencyFormatter, dateFormatter } from "../utils/formatters";
import { Section } from "./Section";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";

type TableTradesProps = {
  trades: TradeEntry[];
};

export function TableTrades(props: TableTradesProps) {
  const { trades } = props;
  return (
    <Section title="Trades" gridArea="trades">
      <table style={{ flexGrow: 1 }}>
        <thead>
          <tr>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Price</TableHeader>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.tid}>
              <TableCell>{trade.amount}</TableCell>
              <TableCell>{dateFormatter.format(trade.date)}</TableCell>
              <TableCell>{currencyFormatter.format(trade.price)}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
