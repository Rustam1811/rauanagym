interface TableProps {
  headers: string[];
  data: any[];
}

export default function Table({ headers, data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Table rows */}
      </tbody>
    </table>
  );
}
