import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FrameComponent from "../components/FrameComponent/FrameComponent";
import styles from "./ForgotPasswordStep.module.css";

const ForgotPasswordStep = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(""); // Add state to store email

  const handleBackToLoginClick = () => {
    navigate("/reset-password-step-3");
  };

  const handleSendClick = () => {
    alert("Email Sent");
  };

  const handleVerifyOTPClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: parseInt(otp) }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpVerified(true);
        alert(data.message );
      } else {
        setOtpVerified(false);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setOtpVerified(false);
      setErrorMessage("An error occurred during OTP verification. Please try again.");
      console.error("An error occurred during OTP verification:", error);
    }
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setOtp(value);
      setOtpVerified(false);
    }
  };

  return (
      <div className={styles.forgotPasswordStep3}>
        <FrameComponent />
        <div className={styles.formContainer}>
          <div className={styles.otpForm}>
            <div className={styles.instructions}>
              <button type="button" className={styles.resendButton} onClick={handleSendClick}>
                Resend Email
              </button>
            </div>
            <form className={styles.emailSendForm}>
              <div className={styles.enterTheEmail}>
                <p>We have sent a verification code to your registered email address</p>
              </div>
            </form>
            <div className={styles.otpContainer}>
              <div className={styles.checkYourEmail}>OTP Verification Code</div>
              <div className={styles.otpInputContainer}>
                <input
                    type="text"
                    maxLength="6"
                    className={styles.otpInput}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                />
                <button
                    type="button"
                    className={`${styles.verifyButton} ${otp.length !== 6 ? styles.disabledButton : ""}`}
                    onClick={handleVerifyOTPClick}
                    disabled={otp.length !== 6}
                >
                  Verify OTP
                </button>
              </div>
            </div>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <button
                type="button"
                className={`${styles.backToLoginButton} ${!otpVerified ? styles.disabledButton : ""}`}
                onClick={handleBackToLoginClick}
                disabled={!otpVerified}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
  );
};

export default ForgotPasswordStep;
