import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent from "../components/FrameComponent/FrameComponent";
import styles from "./ForgotPasswordStep.module.css";

const ForgotPasswordStep = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleBackToLoginClick = () => {
    navigate("/login");
  };

  const handleSendClick = () => {
    if (isEmailValid) {
      navigate("/verify-otp");
    }
  };

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  return (
    <div className={styles.forgotPasswordStep3}>
      <FrameComponent />
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className={styles.instructions}>
            <h1 className={styles.forgotPassword}>Forgot Password</h1>
            <div className={styles.enterTheEmail}>
              Enter your registered email address to get the OTP.
            </div>
          </div>
          <form className={styles.emailSendForm}>
            <input
              className={styles.emailInput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className={`${styles.submitButton} ${!isEmailValid ? styles.disabledButton : ""}`}
              onClick={handleSendClick}
              disabled={!isEmailValid}
            >
              Send
            </button>
          </form>
          <button
            type="button"
            className={styles.backToLoginButton}
            onClick={handleBackToLoginClick}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStep;



