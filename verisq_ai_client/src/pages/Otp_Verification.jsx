import { useState, useRef } from "react";
import "../styles/otp_verification.css";

export default function Otp_verification() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("chiraglimbachiya_prjzo@mailsac.com");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleSendCode = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1400);
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = [...otp];
    [...pasted].forEach((ch, i) => (updated[i] = ch));
    setOtp(updated);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = () => {
    alert(`OTP "${otp.join("")}" verified successfully!`);
  };

  return (
    <div className="Otp_verification_root">
      {/* Ambient blobs */}
      <div className="Otp_verification_blob Otp_verification_blob_tr" />
      <div className="Otp_verification_blob Otp_verification_blob_bl" />
      <div className="Otp_verification_dots" />

      {/* Top-right trial badge */}
      <div className="Otp_verification_trial_pill">
        <span className="Otp_verification_trial_icon">🔒</span>
        #DONTBELARRY TRIAL
      </div>

      {/* Card */}
      <div className="Otp_verification_card">
        <div className="Otp_verification_card_top_accent" />

        {/* Logo */}
        <div className="Otp_verification_logo">
          <div className="Otp_verification_logo_icon">
            <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 2L4 9V22C4 31.4 11 40.1 20 42C29 40.1 36 31.4 36 22V9L20 2Z"
                fill="var(--Otp_verification_primary)"
              />
              <path
                d="M14 22L18 26L26 18"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="Otp_verification_logo_text">
            <span className="Otp_verification_logo_name">LIVETHREAT</span>
            <span className="Otp_verification_logo_sub">SECURITY SCORECARD</span>
          </div>
        </div>

        {/* ── Email Step ── */}
        {step === "email" && (
          <div className="Otp_verification_step">
            <h1 className="Otp_verification_heading">Sign in to your trial</h1>
            <p className="Otp_verification_desc">
              Enter your work email to receive a one-time login code
            </p>

            <div className="Otp_verification_field_group">
              <label
                className="Otp_verification_field_label"
                htmlFor="Otp_verification_email"
              >
                Work Email
              </label>
              <input
                id="Otp_verification_email"
                type="email"
                className="Otp_verification_field_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
              <span className="Otp_verification_field_hint">
                Email is prefilled from your invitation link.
              </span>
            </div>

            <button
              className="Otp_verification_primary_btn"
              onClick={handleSendCode}
              disabled={loading || !email}
            >
              {loading ? (
                <span className="Otp_verification_spinner" />
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="Otp_verification_btn_icon"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send Login Code
                </>
              )}
            </button>

            <p className="Otp_verification_footer_note">
              Don&apos;t have an account?{" "}
              <a href="#" className="Otp_verification_text_link">
                Start free trial
              </a>
            </p>
          </div>
        )}

        {/* ── OTP Step ── */}
        {step === "otp" && (
          <div className="Otp_verification_step">
            <div className="Otp_verification_sent_badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Code sent successfully
            </div>

            <h1 className="Otp_verification_heading">Verify your email</h1>
            <p className="Otp_verification_desc">
              We sent a 6-digit code to{" "}
              <span className="Otp_verification_email_highlight">{email}</span>
            </p>

            <div className="Otp_verification_otp_group" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  className={`Otp_verification_otp_cell${
                    digit ? " Otp_verification_otp_cell_filled" : ""
                  }`}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                />
              ))}
            </div>

            <button
              className="Otp_verification_primary_btn"
              onClick={handleVerify}
              disabled={otp.some((d) => !d)}
            >
              Verify &amp; Sign In
            </button>

            <p className="Otp_verification_footer_note">
              Didn&apos;t receive a code?{" "}
              <button
                className="Otp_verification_text_link Otp_verification_reset_btn"
                onClick={() => {
                  setStep("email");
                  setOtp(["", "", "", "", "", ""]);
                }}
              >
                Resend code
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}