// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="mt-auto text-center py-4" style={{
    backgroundColor: '#0d0d0d',
    color: '#aaaaaa',
    fontSize: '0.9rem',
    borderTop: '1px solid #222'
  }}>
    <div>CineScope &copy; {new Date().getFullYear()} • Powered by OMDB API</div>
    <div>
      Made with 💻 by <a href="https://github.com/Kundan696922" target="_blank" rel="noreferrer" style={{ color: '#E50914' }}>Kundan</a>
    </div>
  </footer>
);

export default Footer;
