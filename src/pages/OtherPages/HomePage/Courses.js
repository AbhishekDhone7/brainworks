import React from "react";
import "./Courses.css";

const Courses = () => {
  const courseList = [
    { title: "Full Stack Web Development", desc: "HTML, CSS, JS, React, Node.js", price: "₹14999" },
    { title: "Python for Beginners", desc: "Python, OOP, Projects", price: "₹9999" },
    { title: "Data Structures & Algorithms", desc: "With JavaScript", price: "₹7999" },
  ];

  return (
    <section className="courses" id="courses">
      <div className="container">
        <h2>Popular Courses</h2>
        <div className="courses-grid">
          {courseList.map((course, idx) => (
            <div key={idx} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
              <span className="price">{course.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
