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
    <footer className="mt-auto bg-gradient-to-b from-amber-50/50 to-orange-50/50 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-lg flex items-center justify-center">
              <BiMessageSquareDetail className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">
              Thread<span className="text-amber-500">Talk</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="flex items-center gap-2 text-sm text-gray-500">
            © {currentYear} ThreadTalk. Made with
            <BiHeart className="w-4 h-4 text-rose-400" />
            using React & Node.js
          </p>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-amber-300 flex items-center justify-center text-gray-400 hover:text-amber-600 transition-all"
            >
              <BiLogoGithub className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-amber-300 flex items-center justify-center text-gray-400 hover:text-amber-600 transition-all"
            >
              <BiInfoCircle className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-amber-300 flex items-center justify-center text-gray-400 hover:text-amber-600 transition-all"
            >
              <BiEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
