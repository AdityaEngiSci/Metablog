import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent from "../components/FrameComponent/FrameComponent";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
          <form className={styles.credentials}>
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
                  src="/iconoutlineeyeoff.svg"
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

