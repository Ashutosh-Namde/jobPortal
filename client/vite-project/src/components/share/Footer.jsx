import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 border-t mt-10 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">JobPortal</h2>
          <p className="mt-2 max-w-xs text-sm">
            Connecting talented professionals with top companies worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 mb-6 md:mb-0">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-gray-900">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.8v-6.9H8v-2.9h2.5v-2.2c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.5.7-1.5 1.4v1.7h2.6l-.4 2.9h-2.2v6.9A10 10 0 0 0 22 12z"/></svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-900">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.1.9 5.3 5.3 0 0 0 2.3-2.9 10.6 10.6 0 0 1-3.4 1.3A5.3 5.3 0 0 0 16 2c-3 0-5.3 2.4-5.3 5.3 0 .4 0 .7.1 1A15 15 0 0 1 3 3.2a5.3 5.3 0 0 0-.7 2.7 5.3 5.3 0 0 0 2.3 4.4 5.3 5.3 0 0 1-2.4-.7v.1c0 2.5 1.8 4.6 4.2 5a5.5 5.5 0 0 1-1.4.2 5.3 5.3 0 0 1-1-.1 5.3 5.3 0 0 0 4.9 3.7 10.6 10.6 0 0 1-6.5 2.3A10.8 10.8 0 0 1 0 19a15 15 0 0 0 8.1 2.4c9.7 0 15-8 15-15 0-.2 0-.5 0-.7A10.6 10.6 0 0 0 23 3z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-gray-900">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.07 1 2.5 1 4.98 2.12 4.98 3.5zM.12 8h4.76v13.88H.12V8zM9.72 8h4.57v1.88h.07c.64-1.2 2.2-2.47 4.52-2.47 4.84 0 5.73 3.19 5.73 7.34V21.88h-4.77v-6.63c0-1.58-.03-3.62-2.21-3.62-2.22 0-2.56 1.73-2.56 3.51V21.88h-4.76V8z"/></svg>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
