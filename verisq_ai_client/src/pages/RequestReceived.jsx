import { useSearchParams } from "react-router-dom";
import "../styles/RequestReceived.css";

function RequestReceived() {

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">✓</div>

        <h2 className="success-title">Request Received!</h2>

        <p className="success-text">
          Thank you for your interest in Verisq AI. We've sent a confirmation to
          <br />
          <strong>{email}</strong>
          <br /><br />
          Once approved, you'll receive a one-time login code via email.
        </p>

        <div className="info-box">
          <p className="info-title">WHAT HAPPENS NEXT</p>
          <p>
            Our team reviews your registration (usually within 1 business day).
            You'll get an email with your login link — no password needed,
            just a secure code.
          </p>
        </div>

        <button className="success-button">
          Visit Verisq AI
        </button>

      </div>
    </div>
  );
}

export default RequestReceived;