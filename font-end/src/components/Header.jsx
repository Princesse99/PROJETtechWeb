import React from "react";
import { FaLock } from "react-icons/fa";

const Header = ({ cartCount = 0, onViewCartClick }) => {
  return (
    <header className="p-6 shadow-md bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src="/images/icon.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">SUN CO.</h1>
      </div>
      <div className="relative">
        <button
          onClick={onViewCartClick} 
          className="flex items-center space-x-2 px-4 py-2 border border-black dark:border-white rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          <FaLock size={18} />
          <span className="font-bold">View Cart</span>
        </button>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;