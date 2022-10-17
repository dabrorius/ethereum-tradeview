import { OrderBookEntry } from "../api/BitstampSocketClient";
import { currencyFormatter } from "../utils/formatters";

type TableBidsProps = {
  data: OrderBookEntry[];
};

export function TableBids(props: TableBidsProps) {
  const { data } = props;
  return (
    <table className="bg-slate-800 grow">
      <thead>
        <tr>
          <th className="text-slate-50 px-2 text-left text-sm font-light">
            Amount
          </th>
          <th className="text-slate-50 px-2 text-right text-sm font-light">
            Bid
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[2]}>
            <td className="w-32 px-2 text-slate-50 text-sm">{row[1]}</td>
            <td className="text-green-600 px-2 text-sm text-right">
              {currencyFormatter.format(parseFloat(row[0]))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
