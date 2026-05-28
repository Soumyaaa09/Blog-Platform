import React, { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await registerUser(formData);

      console.log(data);

      alert("Registration Successful");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">

      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl"
      >

        <h1 className="text-4xl font-black mb-8">
          Register
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none"
          />

          <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-xl font-bold">
            Create Account
          </button>

        </div>

      </form>

    </div>
  );
};

export default Register;