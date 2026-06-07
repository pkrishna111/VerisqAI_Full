import "../styles/AiRecommendationsTable.css";

function AiRecommendationsTable({
  recommendations = []
}) {

  if (!Array.isArray(recommendations)) {

    console.log(
      "Recommendations is not array:",
      recommendations
    );

    return (
      <div className="airecommendationstable">

        <h2>
          AI Recommendations
        </h2>

        <p>
          No recommendations found
        </p>

      </div>
    );
  }

  return (
    <div className="airecommendationstable">

      <h2>
        AI Recommendations
      </h2>

      <table>

        <thead>

          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Category</th>
          </tr>

        </thead>

        <tbody>

          {recommendations.length === 0 ? (

            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center"
                }}
              >
                No recommendations found
              </td>
            </tr>

          ) : (

            recommendations.map(item => (

              <tr key={item.id}>

                <td>
                  {item.title}
                </td>

                <td>
                  {item.priority}
                </td>

                <td>
                  {item.category}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default AiRecommendationsTable;