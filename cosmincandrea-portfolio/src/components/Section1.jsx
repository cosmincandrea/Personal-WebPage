import React from "react";
import "../styles/Section1.css";
import FloatingGraph from "./FloatingGraph";  
import profileImage from "../assets/hero.png";

const Section1 = () => {
    return (
      <div className="section1-container" id="home">
        <div className="section1-profile">
          <img src={profileImage} alt="Profile" className="profile-pic" />
          <h1 className="profile-name">Hello, I’m Cosmin Candrea</h1>
          <p className="profile-description">
            ServiceNow Technical Consultant passionate about ...
          </p>
        </div>
  
        {/* Now the floating graph is below the description */}
        <FloatingGraph />
      </div>
    );
  };
  

export default Section1;