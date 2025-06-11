import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
       
        <div className="flex items-center space-x-2">
          <img src="/images/icon.png" alt="Logo" className="w-5 h-5" />
          <span className="font-semibold text-sm">SUN CO.</span>
        </div>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          © 2023 dot.cards text task. All rights reserved
        </p>
        <div className="flex space-x-4">
        
          <a
            href="https://www.instagram.com/VOTRE_NOM_D_UTILISATEUR_INSTAGRAM" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaInstagram size={16} />
          </a>

      
          <a
            href="https://www.facebook.com/nayahsarobidy.nayah.3" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaFacebook size={16} /> 
          </a>
          <a
            href="https://twitter.com/VOTRE_NOM_D_UTILISATEUR_TWITTER" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="https://www.youtube.com/channel/VOTRE_ID_CANAL_YOUTUBE" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaYoutube size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;