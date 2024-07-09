import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent from "../../components/FrameComponent/FrameComponent";
import styles from "./ForgotPasswordStep.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPasswordStep = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleBackToLoginClick = () => {
    navigate("/login");
  };

  const handleSendClick = async () => {
    if (isEmailValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/forget-password', null, {
          params: { email },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'OTP has been sent to your email successfully.',
          }).then(() => {
            navigate("/verify-otp", { state: { email } });
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message || 'Failed to send OTP. Please try again.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'An error occurred while sending the OTP. Please try again.',
        });
      }
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




