import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppRoutesPaths } from "../routes/appRoutes";
import { ConnectWallet } from "./connectWallet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const navigate = useNavigate();
  const location = useLocation(); // Detect current route

  // Helper function to determine if a menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-900 text-white py-4 px-8">
      {/* Main navbar container */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={() => navigate(AppRoutesPaths.home)}
          className="text-2xl font-bold cursor-pointer"
        >
          MyDEX
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Desktop and Mobile Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent z-10`}
        >
          <li
            onClick={() => {
              setIsMenuOpen(false);
              navigate(AppRoutesPaths.swap);
            }}
            className={`block py-2 px-4 cursor-pointer ${
              isActive(AppRoutesPaths.swap) ? "text-blue-400 font-bold" : "hover:text-blue-400"
            }`}
          >
            Swap
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(false);
              navigate(AppRoutesPaths.transfer);
            }}
            className={`block py-2 px-4 cursor-pointer ${
              isActive(AppRoutesPaths.transfer) ? "text-blue-400 font-bold" : "hover:text-blue-400"
            }`}
          >
            Transfer
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(false);
              navigate(AppRoutesPaths.exchange);
            }}
            className={`block py-2 px-4 cursor-pointer ${
              isActive(AppRoutesPaths.exchange) ? "text-blue-400 font-bold" : "hover:text-blue-400"
            }`}
          >
            Exchange
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(false);
              navigate(AppRoutesPaths.liquidity);
            }}
            className={`block py-2 px-4 cursor-pointer ${
              isActive(AppRoutesPaths.liquidity) ? "text-blue-400 font-bold" : "hover:text-blue-400"
            }`}
          >
            Liquidity
          </li>
          <li className="py-2 px-4">
            <ConnectWallet setPublicKey={(pubKey) => sessionStorage.setItem("publicKey", pubKey)} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
