import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Gurus Classes of English</h3>
            <p className="text-gray-400 mb-4">
              Master English with confidence under the guidance of experienced lecturer S.D. Singh Ratan.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors text-2xl"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary-500 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li className="hover:text-primary-500 transition-colors cursor-pointer">
                Spoken English
              </li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">
                English Grammar
              </li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">
                Interview Preparation
              </li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">
                Communication Skills
              </li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">
                Personality Development
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span>Your Address Here, City, State - PIN</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="hover:text-primary-500 transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <a href="mailto:contact@gurusclassesofenglish.com" className="hover:text-primary-500 transition-colors">
                  contact@gurusclassesofenglish.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Gurus Classes of English. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed and Developed with ❤️ by S.D. Singh Ratan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
