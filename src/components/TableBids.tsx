import { OrderBookEntry } from "../api/BitstampSocketClient";
import { currencyFormatter } from "../utils/formatters";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";

type TableBidsProps = {
  data: OrderBookEntry[];
};

export function TableBids(props: TableBidsProps) {
  const { data } = props;
  return (
    <table style={{ flexGrow: 1 }}>
      <thead>
        <tr>
          <TableHeader>Amount</TableHeader>
          <TableHeader align="right">Bid</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={`${row[0]}-${row[1]}`}>
            <TableCell>{row[1]}</TableCell>
            <TableCell type="positive" align="right">
              {currencyFormatter.format(parseFloat(row[0]))}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
