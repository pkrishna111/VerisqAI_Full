import "../styles/AiActivityTable.css";

function AiActivityTable({
  data = []
}) {
  return (
    <div className="aiactivitytable">

      <div className="aiactivitytable-header">
        <h3>
          Recent AI Activity
        </h3>
      </div>

      <table>

        <thead>

          <tr>
            <th>Operation</th>
            <th>Model</th>
            <th>Tokens</th>
            <th>Response Time</th>
            <th>Status</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                className="aiactivitytable-empty"
              >
                No AI activity found
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
                  {item.totalTokens}
                </td>

                <td>
                  {item.responseTimeSeconds}s
                </td>

                <td>

                  <span
                    className={
                      item.status === "Success"
                        ? "aiactivitytable-success"
                        : "aiactivitytable-failed"
                    }
                  >
                    {item.status}
                  </span>

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

export default AiActivityTable;