import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        formData
      );
      console.log(res.data); // Handle success, redirect, or show a message
    } catch (error) {
      console.error("Error registering user: ", error.response.data);
    }
  };

  return (
    <div className=" shadow-xl max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Name</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button
          className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
