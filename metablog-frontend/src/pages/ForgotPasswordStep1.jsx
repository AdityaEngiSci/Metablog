

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import FrameComponent from "../components/FrameComponent";
// import styles from "./ForgotPasswordStep.module.css";

// const ForgotPasswordStep = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);

//   const handleBackToLoginClick = () => {
//     navigate("/reset-password-step-3");
//   };

//   const handleSendClick = () => {
//     navigate("/forgot-password-step-4");
//   };

//   const handleVerifyOTPClick = () => {
//     if (otp.length === 6) {
//       setOtpVerified(true);
//       alert("OTP Verified");
//     } else {
//       alert("Please enter a valid OTP");
//     }
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//     setOtpVerified(false);
//   };

//   return (
//     <div className={styles.forgotPasswordStep3}>
//       <FrameComponent />
//       <div className={styles.formContainer}>
//         <div className={styles.otpForm}>
//           <div className={styles.instructions}>
//             <div className={styles.checkYourEmail}>Check Your Email</div>
//             <div className={styles.enterTheEmail}>
//               We have sent an email to the address you provided with instructions to reset your password.
//             </div>
//             <button type="button" className={styles.resendButton} onClick={handleSendClick}>
//               Resend Email
//             </button>
//           </div>
//           <form className={styles.emailSendForm}>
//             <div className={styles.enterTheEmail}>
//               <p>We have sent a verification code to your mobile number</p>
//             </div>
//           </form>
//           <div className={styles.otpContainer}>
//             <div className={styles.checkYourEmail}>OTP Verification Code</div>
//             <div className={styles.otpInputContainer}>
//               <input
//                 type="text"
//                 maxLength="6"
//                 className={styles.otpInput}
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={handleOtpChange}
//               />
//               <button
//                 type="button"
//                 className={styles.verifyButton}
//                 onClick={handleVerifyOTPClick}
//                 disabled={otp.length !== 6}
//               >
//                 Verify OTP
//               </button>
//             </div>
//           </div>
//           <button
//             type="button"
//             className={styles.backToLoginButton}
//             onClick={handleBackToLoginClick}
//             disabled={!otpVerified}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordStep;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FrameComponent from "../components/FrameComponent";
import styles from "./ForgotPasswordStep.module.css";

const ForgotPasswordStep = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleBackToLoginClick = () => {
    navigate("/reset-password-step-3");
  };

  const handleSendClick = () => {
    navigate("/forgot-password-step-4");
  };

  const handleVerifyOTPClick = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
      alert("OTP Verified");
    } else {
      alert("Please enter a valid OTP");
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
            {/* <div className={styles.checkYourEmail}>Check Your Email</div>
            <div className={styles.enterTheEmail}>
              We have sent an email to the address you provided with instructions to reset your password.
            </div> */}
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
