import React from "react";
import { Link } from "react-router-dom";
import {
  BiHeart,
  BiMessageSquareDetail,
  BiLogoGithub,
  BiEnvelope,
  BiInfoCircle,
} from "react-icons/bi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: "auto",
        background:
          "linear-gradient(to bottom, rgba(254, 243, 199, 0.3), rgba(254, 215, 170, 0.3))",
        borderTop: "1px solid #fde68a",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
          className="footer-content"
        >
          {/* Brand */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background:
                  "linear-gradient(to bottom right, #fbbf24, #fb923c, #fb7185)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiMessageSquareDetail
                style={{ width: "16px", height: "16px", color: "white" }}
              />
            </div>
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "#1f2937",
              }}
            >
              Thread<span style={{ color: "#f59e0b" }}>Talk</span>
            </span>
          </Link>

          {/* Copyright */}
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            © {currentYear} ThreadTalk. Made with
            <BiHeart
              style={{ width: "16px", height: "16px", color: "#fb7185" }}
            />
            using React & Node.js
          </p>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href="#"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "white",
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fbbf24";
                e.currentTarget.style.color = "#f59e0b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <BiLogoGithub style={{ width: "20px", height: "20px" }} />
            </a>
            <a
              href="#"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "white",
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fbbf24";
                e.currentTarget.style.color = "#f59e0b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <BiInfoCircle style={{ width: "20px", height: "20px" }} />
            </a>
            <a
              href="#"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "white",
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fbbf24";
                e.currentTarget.style.color = "#f59e0b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <BiEnvelope style={{ width: "20px", height: "20px" }} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-content {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
