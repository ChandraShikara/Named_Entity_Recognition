import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Named Entity Recognition Dashboard. Built
        with 💙 for NLP Enthusiasts.
      </p>
    </footer>
  );
};

export default Footer;
