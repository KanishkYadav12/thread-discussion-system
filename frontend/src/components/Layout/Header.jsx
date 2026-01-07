import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BiMessageSquareDetail,
  BiPlus,
  BiMenu,
  BiX,
  BiHome,
} from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255, 255, 255, 0.8)" : "white",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled
          ? "0 10px 15px -3px rgba(251, 191, 36, 0.1)"
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
        }}
      />

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background:
                  "linear-gradient(to bottom right, #fbbf24, #fb923c, #fb7185)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px -1px rgba(251, 191, 36, 0.3)",
              }}
            >
              <BiMessageSquareDetail
                style={{ width: "20px", height: "20px", color: "white" }}
              />
            </div>

            <div>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#1f2937",
                }}
              >
                Thread<span style={{ color: "#f59e0b" }}>Talk</span>
              </h1>
              <p
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Community Discussions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.5rem",
            }}
            className="desktop-nav"
          >
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginRight: "0.75rem",
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: location.pathname === "/" ? "#f59e0b" : "#6b7280",
                  background:
                    location.pathname === "/" ? "#fef3c7" : "transparent",
                }}
              >
                <BiHome style={{ width: "16px", height: "16px" }} />
                Home
              </Link>
            </nav>

            <button
              onClick={() => navigate("/create")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                background:
                  "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
                color: "white",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 6px -1px rgba(251, 191, 36, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(251, 191, 36, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(251, 191, 36, 0.3)";
              }}
            >
              <BiPlus style={{ width: "20px", height: "20px" }} />
              <span>Create Post</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              background: "#f9fafb",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <BiX style={{ width: "24px", height: "24px" }} />
            ) : (
              <BiMenu style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: mobileMenuOpen ? "256px" : "0",
            paddingBottom: mobileMenuOpen ? "1.5rem" : "0",
            transition: "all 0.3s ease",
          }}
          className="mobile-menu"
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.3s ease",
                color: location.pathname === "/" ? "#f59e0b" : "#6b7280",
                background:
                  location.pathname === "/" ? "#fef3c7" : "transparent",
              }}
            >
              <BiHome style={{ width: "16px", height: "16px" }} />
              Home
            </Link>
            <button
              onClick={() => navigate("/create")}
              style={{
                marginTop: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background:
                  "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "0.875rem",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              <BiPlus style={{ width: "20px", height: "20px" }} />
              Create Post
            </button>
          </nav>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
