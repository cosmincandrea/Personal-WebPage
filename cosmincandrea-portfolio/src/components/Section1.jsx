import React from "react";
import "../styles/Section1.css";
import FloatingGraph from "./FloatingGraph";  
import profileImage from "../assets/hero.png";

const Section1 = () => {
  return (
    <div className="section1-container">
      {/* Left Side - Profile Section */}
      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-pic" />
        <h1 className="profile-name">Hello, I’m Cosmin Candrea</h1>
        <p className="profile-description">
          ServiceNow Technical Consultant passionate about building efficient IT
          service management solutions, with a background in Computer Engineering 
          and a Master’s in Data Science.
        </p>
      </div>

      {/* Right Side - Graph */}
      <div className="graph-section">
        <FloatingGraph />
      </div>
    </div>
  );
};


export default Section1;