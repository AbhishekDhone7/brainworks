import React from "react";
import "./SupportPage.css";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

const SupportPage = () => {
  return (
    <>
      <Header />
      <div className="support-page">
        <div className="container">
          <h1>Support Center</h1>
          <p className="subtitle">We're here to help you with any questions or issues.</p>

          <div className="support-grid">
            {/* Contact Form */}
            <div className="support-form">
              <h2>Contact Us</h2>
              <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <textarea rows="5" placeholder="Your message..." required></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>

            {/* FAQs */}
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq">
                <h4>How do I enroll in a course?</h4>
                <p>Go to the Courses section, choose your course, and click the "Enroll Now" button.</p>
              </div>
              <div className="faq">
                <h4>Will I get a certificate after completion?</h4>
                <p>Yes! Every course comes with a downloadable certificate upon completion.</p>
              </div>
              <div className="faq">
                <h4>Can I access courses offline?</h4>
                <p>Currently, all courses are available online only. Offline access will be added soon.</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="contact-details">
            <h2>Contact Information</h2>
            <p>Email: support@brainworks.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Support Hours: Mon–Fri, 10AM to 6PM IST</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
