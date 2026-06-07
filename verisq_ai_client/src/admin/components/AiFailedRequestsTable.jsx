import "../styles/AiFailedRequestsTable.css";

function AiFailedRequestsTable({
  data = []
})
{
  return (
    <div className="aifailedrequeststable">

      <div className="aifailedrequeststable-header">

        <h3>
          Failed Requests
        </h3>

      </div>

      <table>

        <thead>

          <tr>
            <th>Operation</th>
            <th>Model</th>
            <th>Error</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td
                colSpan="4"
                className="aifailedrequeststable-empty"
              >
                No failed requests found
              </td>
            </tr>

          ) : (

            data.map(item => (

              <tr key={item.id}>

                <td>
                  {item.operation}
                </td>

                <td>
                  {item.modelName}
                </td>

                <td>
                  {item.errorMessage}
                </td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default AiFailedRequestsTable;