import "./analyzerTable.css";

function AnalyzerTable({
  analyzedData,
}: {
  analyzedData: Map<string, number>;
}) {
  return (
    <table id="analyzerTable">
      <thead>
        <tr>
          <th>Word</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(analyzedData).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AnalyzerTable;
