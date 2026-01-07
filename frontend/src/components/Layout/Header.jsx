import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiMessageSquareDetail, BiPlus, BiMenu, BiX } from "react-icons/bi";

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-amber-100/50"
          : "bg-white"
      }`}
    >
      {/* Decorative top accent line */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                <BiMessageSquareDetail className="w-5 h-5 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Thread<span className="text-amber-500">Talk</span>
              </h1>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">
                Community Discussions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1 mr-3">
              <Link
                to="/"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-amber-600 bg-amber-50"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
            </nav>

            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white rounded-full font-semibold text-sm shadow-lg shadow-amber-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <BiPlus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <BiX className="w-6 h-6" />
            ) : (
              <BiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link
              to="/"
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === "/"
                  ? "text-amber-600 bg-amber-50"
                  : "text-gray-500"
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => navigate("/create")}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-xl font-semibold text-sm text-white"
            >
              <BiPlus className="w-5 h-5" />
              Create Post
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
