import "./QuestionItem.css";

export default function QuestionItem({
  index,
  question,
  value,
  onChange
}) {

  const renderInput = () => {

    switch (question.questionType) {

      case "SingleSelect":
        return (
          <div className="QuestionItem-options">

            {question.options?.map(option => (

              <label
                key={option.id}
                className={`QuestionItem-option ${value === option.optionText
                  ? "active"
                  : ""
                  }`}
              >
                <input
                  type="radio"
                  checked={
                    value === option.optionText
                  }
                  onChange={() =>
                    onChange(option.optionText)
                  }
                />

                <span>
                  {option.optionText}
                </span>

              </label>

            ))}

          </div>
        );

      case "Dropdown":
        return (
          <select
            value={value || ""}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="QuestionItem-input"
          >
            <option value="">
              Select an option
            </option>

            {question.options?.map(option => (

              <option
                key={option.id}
                value={option.optionText}
              >
                {option.optionText}
              </option>

            ))}

          </select>
        );

      case "Text":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="QuestionItem-input"
            placeholder="Type your answer..."
          />
        );

      case "MultiSelect":
        return (
          <div className="QuestionItem-options">

            {(question.options || []).map(option => {

              const selectedValues = Array.isArray(value)
                ? value
                : [];

              return (
                <label
                  key={option.id}
                  className={`QuestionItem-option ${selectedValues.includes(option.optionText)
                      ? "active"
                      : ""
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedValues.includes(
                        option.optionText
                      )
                    }
                    onChange={(e) => {

                      let updatedValues;

                      if (e.target.checked) {

                        updatedValues = [
                          ...selectedValues,
                          option.optionText
                        ];

                      } else {

                        updatedValues =
                          selectedValues.filter(
                            x => x !== option.optionText
                          );
                      }

                      onChange(updatedValues);
                    }}
                  />

                  <span>
                    {option.optionText}
                  </span>

                </label>
              );
            })}

          </div>
        );

      case "YesNo":
      default:
        return (
          <div className="QuestionItem-options">

            <label
              className={`QuestionItem-option ${value === "Yes" ? "active" : ""
                }`}
            >
              <input
                type="radio"
                checked={value === "Yes"}
                onChange={() => onChange("Yes")}
              />
              <span>Yes</span>
            </label>

            <label
              className={`QuestionItem-option ${value === "No" ? "active" : ""
                }`}
            >
              <input
                type="radio"
                checked={value === "No"}
                onChange={() => onChange("No")}
              />
              <span>No</span>
            </label>

          </div>
        );
    }
  };

  return (
    <div className="QuestionItem-container">

      <p className="QuestionItem-question">
        <span className="QuestionItem-number">
          {index + 1}.
        </span>

        {question.questionText}
      </p>

      {question.category && (
        <div
          style={{
            marginBottom: "10px",
            fontSize: "12px",
            color: "#64748b",
            fontWeight: "500"
          }}
        >
          {question.category} • {question.severity}
        </div>
      )}

      {renderInput()}

    </div>
  );
}