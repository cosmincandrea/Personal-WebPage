import React from "react";
import "../styles/Section1.css";
import FloatingGraph from "./FloatingGraph"; 
import { FaEnvelope, FaGithub, FaLinkedin, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import profileImage from "../assets/hero.png";

const Section1 = () => {
  return (
    <div className="section1-container">
      <div className="profile-info">
        <img src="src/assets/hero.png" alt="Cosmin Candrea" className="profile-img" />
        <h1 className="profile-name">Hello, I’m Cosmin Candrea</h1>
        <p className="profile-description">
          ServiceNow Technical Consultant passionate about building efficient IT service management solutions, 
          with a background in Computer Engineering and a Master’s in Data Science.
        </p>

        {/* Location */}
        <p className="profile-location">
          <FaMapMarkerAlt className="icon" /> Romania, Transylvania, Cluj-Napoca
        </p>

        {/* Contact Links */}
        <div className="contact-links">
          <a href="mailto:cosmincandrea1@gmail.com" className="contact-item">
            <FaEnvelope className="icon" /> candrea.cosmin@example.com
          </a>
          <a href="https://github.com/cosmincandrea" className="contact-item" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" /> GitHub
          </a>
          <a href="www.linkedin.com/in/cosmin-candrea" className="contact-item" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" /> LinkedIn
          </a>
        </div>

        {/* Download Resume Button */}
        <a href="/assets/Resume_Cosmin_Candrea.pdf" download className="download-resume">
          <FaDownload className="icon" /> Download Resume
        </a>
      </div>
      <div className="graph-section">
        <FloatingGraph />
      </div>
    </div>
  );
};


export default Section1;