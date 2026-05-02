import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { Icon: ExternalLink, label: 'GitHub', href: '#' },
    { Icon: Globe, label: 'Website', href: '#' },
    { Icon: Mail, label: 'Email', href: 'mailto:support@smartstudy.com' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SmartStudy <span className="text-blue-500">LMS</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Empowering students and teachers with a modern, collaborative learning environment. Join the future of education today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, label, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  aria-label={label}
                  className="hover:text-blue-500 transition-colors p-2 bg-slate-800 rounded-lg"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Courses', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-white font-semibold mb-6">User Portals</h4>
            <ul className="space-y-4">
              <li><Link to="/auth?role=student" className="hover:text-blue-500 transition-colors">Student Login</Link></li>
              <li><Link to="/auth?role=teacher" className="hover:text-blue-500 transition-colors">Teacher Login</Link></li>
              <li><Link to="/courses" className="hover:text-blue-500 transition-colors">Course Catalog</Link></li>
              <li><Link to="/materials" className="hover:text-blue-500 transition-colors">Study Materials</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>123 Education St, Learning City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>support@smartstudy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SmartStudy LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
