
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">ShopConnect</h2>
            <p className="text-gray-400 mb-4">Your one-stop shop for quality products at affordable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/electronics" className="text-gray-400 hover:text-white">Electronics</Link>
              </li>
              <li>
                <Link to="/categories/clothing" className="text-gray-400 hover:text-white">Clothing</Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-gray-400 hover:text-white">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/categories/beauty" className="text-gray-400 hover:text-white">Beauty & Personal Care</Link>
              </li>
              <li>
                <Link to="/categories/sports" className="text-gray-400 hover:text-white">Sports & Outdoors</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">Shipping</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">Returns</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">1234 Market St, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">support@shopconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
