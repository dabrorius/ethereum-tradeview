import { TradeEntry } from "../hooks/useLiveTrades";
import { Section } from "./Section";

type TableTradesProps = {
  trades: TradeEntry[];
};

export function TableTrades(props: TableTradesProps) {
  const { trades } = props;
  return (
    <Section title="Trades" gridArea="trades">
      <table className="bg-slate-800 grow">
        <thead>
          <tr>
            <th className="text-slate-50 px-2 text-left text-sm font-light">
              Amount
            </th>
            <th className="text-slate-50 px-2 text-right text-sm font-light">
              Date
            </th>
            <th className="text-slate-50 px-2 text-right text-sm font-light">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.tid}>
              <td className="text-slate-50 px-2 text-sm text-right">
                {trade.amount}
              </td>
              <td className="text-slate-50 px-2 text-sm text-right">
                {trade.date.toString()}
              </td>
              <td className="text-slate-50 px-2 text-sm text-right">
                {trade.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
