import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [photo, setPhoto] = useState(null);
  const [students, setStudents] = useState([]); // State for storing fetched students
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  // Handle photo file upload
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Method for fetching student data from the backend
  const fetchStudentsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setStudents(response.data);
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching student data:", error);
      setErrorMessage("Failed to fetch student data.");
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("student", JSON.stringify(studentData));
    formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:8080/sql", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure this header is set correctly
        },
      });
      alert("Student data added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding student data:", error);
      alert("Failed to add student data.");
    }
};


  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={studentData.age}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handlePhotoChange} required />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Add Student
        </button>
      </form>

      {/* Button to fetch students */}
      <button
        onClick={fetchStudentsData}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
        }}
      >
        Fetch Students
      </button>

      <h2 style={{ marginTop: "40px" }}>Students List</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        {students.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {students.map((student, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>Age:</strong> {student.age}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                {student.photo && (
                  <img
                    src={`data:image/jpeg;base64,${btoa(
                      String.fromCharCode(...new Uint8Array(student.photo))
                    )}`}
                    alt="Student"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
