export default function FindingsModal({ isOpen, onClose, findings }) {
    if (!isOpen) return null;

    const groups = [
        { label: "Critical", value: 4 },
        { label: "High", value: 3 },
        { label: "Medium", value: 2 }
    ];

    if (!findings || findings.length === 0) {
        return (
            <div className="modal-overlay">
                <div className="modal-box">
                    <div className="modal-header">
                        <h3>Findings</h3>
                        <button onClick={onClose}>✖</button>
                    </div>
                    <p className="no-findings">No findings 🎉</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>Findings</h3>
                    <button onClick={onClose}>✖</button>
                </div>

                {groups.map((level) => {
                    const items = findings.filter(f => f.severity === level.value);

                    if (items.length === 0) return null;

                    return (
                        <div key={level.label} className="modal-group">
                            <h4>{level.label}</h4>

                            {items.map((f, i) => (
                                <div key={i} className="modal-item">
                                    <strong>{f.title}</strong>
                                    <p style={{ whiteSpace: "pre-line" }}>
                                        {f.description || "No description available"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                })}

                {findings.length === 0 && (
                    <p className="no-findings">No findings 🎉</p>
                )}
            </div>
        </div>
    );
}