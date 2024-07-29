import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./RegisterAdmin.css";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const isFormValid =
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword;
    setIsFormValid(isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
      return;
    }

    const registerData = {
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: "Admin",
    };

    try {
      const response = await axios.post(`${base_url}/admin/blogs/register-admin`, registerData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }});
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "User Created",
          text: response.data.message || "User created successfully. Please verify the OTP sent to your email.",
        });
        setShowOtpField(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "An error occurred. Please try again.",
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/otp/verify`, {
        email: formData.email,
        otp: otp,
      });
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "OTP verified successfully. Redirecting to admin home page.",
        });
        navigate("/admin-home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "Invalid OTP. Please try again.",
      });
    }
  };

  return (
    <div className="admin-create-page">
      <h1>Create Admin User</h1>
      <form onSubmit={handleSubmit} className="admin-create-form">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit" className="submit-button" disabled={!isFormValid}>
          Create User
        </button>
      </form>

      {showOtpField && (
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit" className="submit-button">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterAdmin;
