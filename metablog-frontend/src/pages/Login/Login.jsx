import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent from "../../components/FrameComponent/FrameComponent";
import styles from "./Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password-step-3");
  };

  const handleSignUpClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/auth/login`, formData);
      if (response.data.success) {
        const { accessToken, role } = response.data.data;

        // Store tokens in local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('role', role);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message || "Logged in successfully."
        })
        // Redirect based on role
        if (role === 'User') {
          navigate("/blogs-listing"); // Redirect to blogs listing page
        } else if (role === 'Admin') {
          navigate("/admin-home");  // Redirect to admin home page
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to login. Please try again."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to login. Please try again."
      });
    }
  }

  useEffect(() => {
    const validateForm = () => {
      const { email, password } = formData;
      const emailRegex = /\S+@\S+\.\S+/;
      setIsFormValid(emailRegex.test(email) && password.trim() !== '');
    };

    validateForm();
  }, [formData]);

  return (
      <div className={styles.login}>
        <FrameComponent />
        <div className={styles.authContainer}>
          <div className={styles.authFields}>
            <div className={styles.authHeader}>
              <h1 className={styles.welcomeBack}>Welcome Back</h1>
              <div className={styles.dontHaveAnContainer}>
                <span>{`Don’t have an account? `}</span>
                <span className={styles.signUp} onClick={handleSignUpClick}>
                Sign Up
              </span>
              </div>
            </div>
            <form className={styles.credentials} onSubmit={handleLogin}>
              <div className={styles.inputFields}>
                <div className={styles.inputTrio}>
                  <input
                      className={styles.email}
                      name="email"
                      placeholder="Email"
                      type="text"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className={styles.inputTrio1}>
                  <input
                      className={styles.password}
                      name="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                  />
                  <img
                      className={styles.iconoutlineeyeOff}
                      alt=""
                      src={showPassword ? "/iconoutlineeye.svg" : "/iconoutlineeyeoff.svg"}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                  />
                </div>
                <div className={styles.inputTrio2}>
                  <div
                      className={styles.forgotPassword}
                      onClick={handleForgotPasswordClick}
                  >
                    Forgot Password
                  </div>
                </div>
              </div>
              {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
              <button
                  className={`${styles.submission} ${!isFormValid ? styles.disabledButton : ''}`}
                  type="submit"
                  disabled={!isFormValid}
              >
                <div className={styles.login1}>Login</div>
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
