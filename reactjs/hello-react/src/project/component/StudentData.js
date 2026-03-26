import React, { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [photo, setPhoto] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  // Handle photo file upload
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", studentData.name);
    formData.append("age", studentData.age);
    formData.append("email", studentData.email);
    formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:808/sqlproject/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    </div>
  );
};

export default AddStudent;
