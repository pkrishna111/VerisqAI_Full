import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_BASE = "https://localhost:7183";

function VerifyPage() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ ADD THIS (prevents double API call)
  const called = useRef(false);

  // STEP 1 → Confirm email automatically
  useEffect(() => {
    if (email && token && !called.current) {
      called.current = true;   // ✅ block second call
      confirmEmail();
    }
  }, []);

  const confirmEmail = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/auth/confirm-email?email=${email}&token=${encodeURIComponent(token)}`
      );

      if (!res.ok) throw new Error("Email confirmation failed");

      setMessage("OTP sent to your email");

    } catch (err) {
      setMessage("Error verifying email");
    }
  };

  // STEP 2 → Verify OTP
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

      // ✅ store JWT
      localStorage.setItem("token", data.token);

      // ✅ redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Verify Your Account</h2>

      <p>{message}</p>

      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ padding: "10px", marginTop: "10px" }}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyPage;