/**
 * Footer Component
 * Application footer with info and links
 */

import React from "react";
import { BiHeart } from "react-icons/bi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-1">
              © {currentYear} ThreadTalk. Built with
              <BiHeart className="w-4 h-4 text-red-500 inline-block mx-1" />
              using React & Node.js
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
