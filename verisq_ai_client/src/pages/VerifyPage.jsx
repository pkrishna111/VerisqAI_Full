import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/VerifyPage.CSS"; // ✅ import CSS

const API_BASE = "https://localhost:7183";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
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

      setMessage("Login code sent! Check your email.");
    } catch (err) {
      setMessage("Error verifying email");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-totp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          code: otp
        })
      });

      if (!res.ok) throw new Error("Invalid OTP");

      const data = await res.json();

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
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
          We sent a 6-digit code to <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="verify-input"
          />

          <button type="submit" disabled={loading} className="verify-button">
            {loading ? "Verifying..." : "Verify & Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPage;