import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FrameComponent from "../../components/FrameComponent/FrameComponent";
import styles from "./ForgotPasswordStep.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPasswordStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isGoingToLogin, setIsGoingToLogin] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setIsGoingToLogin(location.state.comingFrom);
    }
  }, [location.state]);

  const handleBackToLoginClick = () => {
    navigate("/reset-password-step-3");
  };

  const handleSendClick = () => {
    Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Email resent successfully. Check your inbox for the OTP.",
        });
  };

  const handleVerifyOTPClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/otp/verify",
          { email, otp: parseInt(otp) },
          { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        setOtpVerified(true);
        await Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: response.data.message,
        });
        if (isGoingToLogin === "signup") {
          navigate("/login");
        }else {
          navigate("/reset-password-step-3" , { state: { email } });
        }
      } else {
        setOtpVerified(false);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      setOtpVerified(false);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during OTP verification. Please try again.");
      }
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
