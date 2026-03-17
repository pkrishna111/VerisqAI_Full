import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const excuses = [
  "We can't afford it.",
  "It's not in this year's budget.",
  "We don't have anyone who knows how.",
  "Our security team is stretched thin.",
  "We'll get to it next quarter.",
  "We have too many vendors to even start."
];

function ExcuseRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === excuses.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="excuse-container">
      <div className="excuse-label">
        <AlertTriangle size={14} />
        LARRY SAYS:
      </div>

      <div key={currentIndex} className="excuse-text animate-excuse">
        "{excuses[currentIndex]}"
      </div>

      <div className="excuse-dots">
        {excuses.map((_, index) => (
          <span
            key={index}
            className={`excuse-dot ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ExcuseRotator;
