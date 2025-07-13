import React, { useEffect, useState } from "react";
import "./StudentCourse.css";

const StudentCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data – replace with API later
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: "c1",
          title: "React Fundamentals",
          instructor: "Abhishek Dhone",
          duration: "4 weeks",
          status: "In Progress",
          attendance: 85,
          projects: {
            completed: 2,
            ongoing: 1,
            pending: 1,
          },
        },
        {
          id: "c2",
          title: "Node.js + MongoDB",
          instructor: "Rohit Bhojwani",
          duration: "5 weeks",
          status: "Completed",
          attendance: 100,
          projects: {
            completed: 3,
            ongoing: 0,
            pending: 0,
          },
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="student-course-page">
      <h2>My Enrolled Courses</h2>
      {loading ? (
        <div className="loader">Loading courses...</div>
      ) : courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => {
            const { completed, ongoing, pending } = course.projects;
            const totalProjects = completed + ongoing + pending;

            return (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>

                <p className="attendance-badge">
                  Attendance: {course.attendance}%
                </p>

                <div className="project-stats">
                  <strong>Projects:</strong>
                  <div className="project-badges">
                    <span className="project-badge completed">Completed: {completed}</span>
                    <span className="project-badge ongoing">Ongoing: {ongoing}</span>
                    <span className="project-badge pending">Pending: {pending}</span>
                    <span className="project-badge total">Total: {totalProjects}</span>
                  </div>
                </div>

                <p className={`status ${course.status.toLowerCase().replace(" ", "-")}`}>
                  {course.status}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentCourse;
