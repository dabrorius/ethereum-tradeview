import { OrderBookEntry } from "../api/BitstampSocketClient";
import { currencyFormatter } from "../utils/formatters";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";

type TableAsksProps = {
  data: OrderBookEntry[];
};

export function TableAsks(props: TableAsksProps) {
  const { data } = props;
  return (
    <table style={{ flexGrow: 1 }}>
      <thead>
        <tr>
          <TableHeader>Ask</TableHeader>
          <TableHeader align="right">Amount</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={`${row[0]}-${row[1]}`}>
            <TableCell type="negative">
              {currencyFormatter.format(parseFloat(row[0]))}
            </TableCell>
            <TableCell align="right">{row[1]}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
