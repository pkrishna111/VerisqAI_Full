import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-content">

        <div className="landing-footer-links">

          <Link
            to="/how-it-works"
            className="landing-footer-link"
          >
            How It Works
          </Link>

          <Link
            to="#"
            className="landing-footer-link"
          >
            Privacy Policy
          </Link>

          <Link
            to="#"
            className="landing-footer-link"
          >
            Terms of Service
          </Link>

          <a
            href="mailto:vigneshchitroda6@gmail.com"
            className="landing-footer-link"
          >
            Contact Support
          </a>

        </div>

        <p className="landing-footer-copy">
          © 2026 Verisq AI. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;