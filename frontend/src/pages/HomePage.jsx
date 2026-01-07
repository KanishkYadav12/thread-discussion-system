import React from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Post/PostList";
import { BiPlus } from "react-icons/bi";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Where Ideas
            <span className="block mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Come to Life
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join our vibrant community to share ideas, ask questions, and
            connect with people who share your passions.
          </p>

          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white rounded-full font-bold text-lg shadow-xl shadow-amber-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <BiPlus className="w-6 h-6" />
            <span>Start a Discussion</span>
          </button>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <PostList />
        </div>
      </section>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate("/create")}
        className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
      >
        <BiPlus className="w-8 h-8" />
      </button>
    </div>
  );
};

export default HomePage;
