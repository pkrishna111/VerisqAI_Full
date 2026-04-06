import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/VerifyPage.CSS"; // ✅ import CSS

const API_BASE = "https://localhost:7183";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [message, setMessage] = useState("");

  const called = useRef(false);

  useEffect(() => {
    if (email && token && !called.current) {
      called.current = true;
      confirmEmail();
    }
  }, [email, token]);

  const confirmEmail = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/auth/confirm-email?email=${email}&token=${encodeURIComponent(token)}`
      );

      if (!res.ok) throw new Error("Email confirmation failed");

      setMessage("Email verified. Waiting for admin approval...");
      setTimeout(() => {
        navigate(`/request-received?email=${email}`);
      }, 1500);
    } catch (err) {
      setMessage("Error verifying email");
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">

        <div className="verify-logo">VERISQ AI</div>

        <h2 className="verify-title">Sign in to your trial</h2>
        <p className="verify-subtitle">
          Enter your email to receive a one-time login code
        </p>

        {message && <div className="verify-message">{message}</div>}

        <p className="verify-email">
          Verifying your email and processing your request... <br />
          <strong>{email}</strong>
        </p>
      </div>
    </div>
  );
}

export default VerifyPage;