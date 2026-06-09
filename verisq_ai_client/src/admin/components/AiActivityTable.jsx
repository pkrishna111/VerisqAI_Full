import { useState } from "react";

import "../styles/AiActivityTable.css";

function AiActivityTable({
  data = []
}) {

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages =
    Math.ceil(
      data.length /
      ITEMS_PER_PAGE
    );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentData =
    data.slice(
      startIndex,
      startIndex +
      ITEMS_PER_PAGE
    );

  return (
    <div className="aiactivitytable">

      <div className="aiactivitytable-header">

        <h3>
          Recent AI Activity
        </h3>

        <span>
          Showing {data.length === 0 ? 0 : startIndex + 1}
          -
          {Math.min(
            startIndex + ITEMS_PER_PAGE,
            data.length
          )}
          {" "}of{" "}
          {data.length}
          {" "}records
        </span>

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

          {currentData.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="aiactivitytable-empty"
              >
                No AI activity found
              </td>

            </tr>

          ) : (

            currentData.map(item => (

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

      {totalPages > 1 && (

        <div className="pagination">

          <button
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>

            )
          )}

          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}

export default AiActivityTable;