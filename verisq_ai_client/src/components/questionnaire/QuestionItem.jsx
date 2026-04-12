import "./QuestionItem.css";

export default function QuestionItem({ index, question, value, onChange }) {
  const isText = index >= 8; // last 2 = text

  return (
    <div className="QuestionItem-container">

      <p className="QuestionItem-question">
        <span className="QuestionItem-number">{index + 1}.</span> {question}
      </p>

      {isText ? (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="QuestionItem-input"
          placeholder="Type your answer..."
        />
      ) : (
        <div className="QuestionItem-options">

          <label className={`QuestionItem-option ${value === "Yes" ? "active" : ""}`}>
            <input
              type="radio"
              checked={value === "Yes"}
              onChange={() => onChange("Yes")}
            />
            <span>Yes</span>
          </label>

          <label className={`QuestionItem-option ${value === "No" ? "active" : ""}`}>
            <input
              type="radio"
              checked={value === "No"}
              onChange={() => onChange("No")}
            />
            <span>No</span>
          </label>

        </div>
      )}
    </div>
  );
}