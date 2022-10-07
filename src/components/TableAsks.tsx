import { OrderBookEntry } from "../api/BitstampSocketClient";

type TableAsksProps = {
  data: OrderBookEntry[];
};

export function TableAsks(props: TableAsksProps) {
  const { data } = props;
  return (
    <table className="bg-slate-800 grow">
      <thead>
        <tr>
          <th className="text-slate-50 px-2 text-left text-sm font-light">
            Ask
          </th>
          <th className="text-slate-50 px-2 text-right text-sm font-light">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[2]}>
            <td className="w-32 px-2 text-red-600 text-sm">{row[0]}</td>
            <td className="text-slate-50 px-2 text-sm text-right">{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
