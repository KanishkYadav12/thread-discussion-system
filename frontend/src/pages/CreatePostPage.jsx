import React from "react";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/Post/CreatePostForm";
import { BiArrowBack } from "react-icons/bi";

const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fffbf5, #fef3c7)",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "9999px",
            color: "#6b7280",
            fontWeight: "500",
            fontSize: "0.875rem",
            background: "white",
            border: "2px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f59e0b";
            e.currentTarget.style.borderColor = "#fbbf24";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <BiArrowBack style={{ width: "18px", height: "18px" }} />
          <span>Back to discussions</span>
        </button>

        {/* Create Post Form */}
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
