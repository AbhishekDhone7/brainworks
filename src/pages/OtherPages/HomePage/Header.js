import React from "react";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="container">
      {/* <h1 className="logo">BRAINWORKS</h1> */}
      <nav>
        <a href="#features">Features</a>
        <a href="#courses">Courses</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;
