import React from 'react';
import { FaWhatsapp, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 font-roboto py-4">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Cubing Kerala. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp className="text-2xl hover:text-green-500" />
          </a>
          <a href="https://instagram.com/yourinstagramlink" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:text-pink-500" />
          </a>
          <a href="https://github.com/yourgithublink" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-2xl hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
