import ResponseBadge from "./ResponseBadge";

import "../../styles/vendor-details/responsesTable.css";

function ResponsesTable({ responses = [] }) {
  return (
    <section className="vd-responses">

      <div className="vd-responses__header">

        <div>
          <h2 className="vd-responses__title">
            Assessment Responses
          </h2>

          <p className="vd-responses__subtitle">
            Questionnaire answers submitted during vendor assessment
          </p>
        </div>

      </div>

      {responses.length === 0 ? (
        <div className="vd-responses__empty">
          No questionnaire responses available yet.
        </div>
      ) : (
        <div className="vd-responses__table-wrapper">

          <table className="vd-responses__table">

            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>

            <tbody>

              {responses.map((response) => (
                <tr key={response.id}>

                  <td>
                    <div className="vd-responses__question">
                      {response.question}
                    </div>
                  </td>

                  <td>
                    <ResponseBadge
                      answer={response.answer}
                    />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}

export default ResponsesTable;