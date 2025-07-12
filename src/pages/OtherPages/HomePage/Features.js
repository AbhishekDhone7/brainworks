import React from "react";
import "./Features.css";

const Features = () => (
  <section className="features" id="features">
    <div className="container">
      <h2>Why Choose Us</h2>
      <div className="features-grid">
        <div className="feature">
          <h3>Expert Mentors</h3>
          <p>Learn from professionals with real-world experience.</p>
        </div>
        <div className="feature">
          <h3>Flexible Learning</h3>
          <p>Learn anytime, anywhere, at your own pace.</p>
        </div>
        <div className="feature">
          <h3>Certificate Courses</h3>
          <p>Earn certificates to boost your career.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
