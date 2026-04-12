export default function QuestionItem({ index, question, value, onChange }) {
  const isText = index >= 8; // last 2 = text

  return (
    <div style={{ marginBottom: "20px" }}>
      <p><strong>{index + 1}. {question}</strong></p>

      {isText ? (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      ) : (
        <div>
          <label>
            <input
              type="radio"
              checked={value === "Yes"}
              onChange={() => onChange("Yes")}
            />
            Yes
          </label>

          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              checked={value === "No"}
              onChange={() => onChange("No")}
            />
            No
          </label>
        </div>
      )}
    </div>
  );
}