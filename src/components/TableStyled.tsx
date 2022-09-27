type TableStyledRow = string[];

type TableStyledProps = {
  data: TableStyledRow[];
};

export function TableStyled(props: TableStyledProps) {
  const { data } = props;
  return (
    <table>
      {data.map((row) => (
        <tr className="font-bold">
          {row.map((value) => (
            <td>{value}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}
