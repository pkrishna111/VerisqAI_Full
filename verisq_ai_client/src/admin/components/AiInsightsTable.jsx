import "../styles/AiInsightsTable.css";

function AiInsightsTable({
  insights = []
}) {

  if (!Array.isArray(insights)) {

    console.log(
      "Insights is not array:",
      insights
    );

    return (
      <div className="aiinsightstable">
        No insights found
      </div>
    );
  }

  return (
    <div className="aiinsightstable">

      <h2>
        Recent AI Insights
      </h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Confidence</th>
            <th>Generated</th>
          </tr>

        </thead>

        <tbody>

          {insights.map(item => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.modelName}</td>

              <td>{item.confidenceScore}</td>

              <td>
                {new Date(
                  item.generatedAt
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AiInsightsTable;