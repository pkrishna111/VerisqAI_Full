import "../../styles/FindingsModal.css";

export default function FindingsModal({ isOpen, onClose, findings }) {
    if (!isOpen) return null;

    const groups = [
        { label: "Critical", value: 4 },
        { label: "High", value: 3 },
        { label: "Medium", value: 2 }
    ];

    if (!findings || findings.length === 0) {
        return (
            <div className="FindingsModal-overlay">
                <div className="FindingsModal-box">
                    <div className="FindingsModal-header">
                        <h3>Findings</h3>
                        <button className="FindingsModal-close" onClick={onClose}>✖</button>
                    </div>
                    <p className="FindingsModal-empty">No findings 🎉</p>
                </div>
            </div>
        );
    }

    return (
        <div className="FindingsModal-overlay">
            <div className="FindingsModal-box">

                <div className="FindingsModal-header">
                    <h3>Findings</h3>
                    <button className="FindingsModal-close" onClick={onClose}>✖</button>
                </div>

                {groups.map((level) => {
                    const items = findings.filter(f => f.severity === level.value);
                    if (items.length === 0) return null;

                    return (
                        <div key={level.label} className="FindingsModal-group">

                            <h4 className={`FindingsModal-group-title ${level.label.toLowerCase()}`}>
                                {level.label}
                            </h4>

                            {items.map((f, i) => (
                                <div key={i} className="FindingsModal-item">
                                    <strong className="FindingsModal-item-title">
                                        {f.title}
                                    </strong>
                                    <p className="FindingsModal-item-desc">
                                        {f.description || "No description available"}
                                    </p>
                                </div>
                            ))}

                        </div>
                    );
                })}

            </div>
        </div>
    );
}