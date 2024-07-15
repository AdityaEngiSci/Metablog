import { useNavigate, useLocation } from "react-router-dom";
import { useState , useEffect} from "react";
import FrameComponent from "../../components/FrameComponent/FrameComponent";
import styles from "./ResetPasswordStep.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPasswordStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  useEffect(() => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email not provided. Please try again.',
      }).then(() => {
        navigate("/forgot-password");
      });
    }
  }, [email, navigate]);

  const handleBackToLoginClick = () => {
    navigate("/login");
  };

  const handleResetPasswordClick = async () => {
    if (!isFormValid) return;

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', {
        email,
        newPassword: password
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password has been reset successfully.',
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Failed to reset password. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred while resetting the password. Please try again.',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
  };

  const isFormValid = password && confirmPassword && password === confirmPassword;

  return (
      <div className={styles.resetPasswordStep3}>
        <FrameComponent />
        <div className={styles.content}>
          <div className={styles.resetTitleParent}>
            <div className={styles.resetTitle}>
              <h1 className={styles.resetPassword}>Reset Password</h1>
              <div className={styles.chooseANew}>
                Choose a new password for your account
              </div>
            </div>
            <form className={styles.passwordFields}>
              <div className={styles.passwordInputs}>
                <div className={styles.inputLabels}>
                  <input
                      className={styles.yourNewPassword}
                      placeholder="Your new password"
                      type={passwordType}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                      className={styles.iconoutlineeyeOff}
                      alt=""
                      src="/iconoutlineeyeoff.svg"
                      onClick={togglePasswordVisibility}
                  />
                </div>
                <div className={styles.inputLabels1}>
                  <input
                      className={styles.confirmYourNew}
                      placeholder="Confirm your new password"
                      type={confirmPasswordType}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                      className={styles.iconoutlineeyeOff1}
                      alt=""
                      src="/iconoutlineeyeoff.svg"
                      onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>
              <button
                  type="button"
                  className={`${styles.resetButton} ${!isFormValid ? styles.disabledButton : ""}`}
                  onClick={handleResetPasswordClick}
                  disabled={!isFormValid}
              >
                <div className={styles.resetPasswordText}>Reset Password</div>
              </button>
              <button
                  type="button"
                  className={styles.loginLink}
                  onClick={handleBackToLoginClick}
              >
                <div className={styles.backToLogin}>Back to Login</div>
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ResetPasswordStep;
