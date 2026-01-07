import { useNavigate } from "react-router-dom";
import PostList from "../components/Post/PostList";
import { BiPlus, BiRocket, BiCompass, BiHeart } from "react-icons/bi";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #fff7ed 0%, #ffedd5 25%, #fed7aa 50%, #fecaca 75%, #fce7f3 100%)",
          padding: "3rem 0 3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(251, 113, 133, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Welcome Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "9999px",
              border: "2px solid rgba(251, 191, 36, 0.3)",
              marginBottom: "1.75rem",
              boxShadow:
                "0 10px 25px -5px rgba(251, 191, 36, 0.2), 0 0 0 1px rgba(251, 191, 36, 0.1)",
              animation: "fadeInDown 0.6s ease-out",
            }}
          >
            <BiRocket
              style={{ width: "16px", height: "16px", color: "#f59e0b" }}
            />
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.025em",
              }}
            >
              Welcome to ThreadTalk
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              fontWeight: "900",
              color: "#0f172a",
              marginBottom: "1rem",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              animation: "fadeInUp 0.8s ease-out 0.2s both",
            }}
          >
            Where Ideas{" "}
            <span
              style={{
                display: "block",
                marginTop: "0.375rem",
                background:
                  "linear-gradient(135deg, #f59e0b 0%, #f97316 30%, #fb923c 50%, #fb7185 70%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation:
                  "fadeInUp 0.8s ease-out 0.3s both, shimmer 3s ease-in-out infinite",
              }}
            >
              Come to Life
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "#64748b",
              marginBottom: "2rem",
              lineHeight: "1.6",
              maxWidth: "40rem",
              margin: "0 auto 1.75rem",
              fontWeight: "500",
              animation: "fadeInUp 0.8s ease-out 0.4s both",
            }}
          >
            Join our vibrant community to share ideas, ask questions, and
            connect with people who share your passions.
          </p>

          {/* CTA Button & Feature Pills Combined */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3rem",
              animation: "fadeInUp 0.8s ease-out 0.5s both",
            }}
          >
            <button
              onClick={() => navigate("/create")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 2rem",
                background:
                  "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #fb7185 100%)",
                color: "white",
                borderRadius: "9999px",
                fontWeight: "700",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 20px 25px -5px rgba(251, 146, 60, 0.4), 0 10px 10px -5px rgba(251, 113, 133, 0.2)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(251, 146, 60, 0.5), 0 15px 25px -5px rgba(251, 113, 133, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(251, 146, 60, 0.4), 0 10px 10px -5px rgba(251, 113, 133, 0.2)";
              }}
            >
              <BiPlus style={{ width: "20px", height: "20px" }} />
              <span>Start a Discussion</span>
            </button>

            {/* Feature Pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.875rem",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                  fontSize: "0.8125rem",
                  fontWeight: "600",
                  color: "#64748b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <BiHeart
                  style={{ width: "14px", height: "14px", color: "#fb7185" }}
                />
                <span>Community Driven</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.875rem",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                  fontSize: "0.8125rem",
                  fontWeight: "600",
                  color: "#64748b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <BiRocket
                  style={{ width: "14px", height: "14px", color: "#f59e0b" }}
                />
                <span>Open Discussions</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.875rem",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                  fontSize: "0.8125rem",
                  fontWeight: "600",
                  color: "#64748b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <BiCompass
                  style={{ width: "14px", height: "14px", color: "#f97316" }}
                />
                <span>Discover Ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Keyframe Animations */}
        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </section>

      {/* Posts Section */}
      <section style={{ padding: "4rem 0", background: "white" }}>
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "0.75rem",
              }}
            >
              Latest Discussions
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
              Explore what the community is talking about
            </p>
          </div>

          <PostList showHeader={false} />
        </div>
      </section>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate("/create")}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "1.5rem",
          width: "4rem",
          height: "4rem",
          background: "linear-gradient(135deg, #f59e0b, #f97316, #fb7185)",
          color: "white",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <BiPlus style={{ width: "32px", height: "32px" }} />
      </button>

      {/* Hide FAB on large screens */}
      <style>{`
        @media (min-width: 1024px) {
          button[style*="position: fixed"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
