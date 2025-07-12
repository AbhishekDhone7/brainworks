import React from "react";
import "./AboutPage.css";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="about">
        <div className="container">
          <h1>About BRAINWORKS</h1>
          <p className="intro">
            At BRAINWORKS, our mission is to make high-quality, affordable, and job-oriented education accessible to everyone. Whether you're a student, a working professional, or a curious learner — we're here to empower your career through technology.
          </p>

          <section className="section">
            <h2>Who We Are</h2>
            <p>
              Founded by experienced IT professionals and educators, BRAINWORKS is a team of passionate individuals who believe in practical, project-based learning. Our mentors bring years of industry experience to the classroom.
            </p>
          </section>

          <section className="section">
            <h2>What We Offer</h2>
            <ul className="offer-list">
              <li>Live Projects and Assignments</li>
              <li>Career Support and Mock Interviews</li>
              <li>Flexible Learning Schedule</li>
              <li>Certification on Course Completion</li>
            </ul>
          </section>

          <section className="section highlight">
            <h2>Why Choose Us?</h2>
            <p>
              With over 1000+ students trained and placed in top companies, our results speak for themselves. We focus on skill-building, not just theory. Our curriculum is constantly updated to match the current industry demands.
            </p>
          </section>

          <div className="cta">
            <h3>Ready to upgrade your career?</h3>
            <a href="/#courses" className="btn">Browse Courses</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
