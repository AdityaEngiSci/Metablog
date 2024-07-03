

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import FrameComponent from "../components/FrameComponent";
// import styles from "./ResetPasswordStep.module.css";

// const ResetPasswordStep = () => {
//   const navigate = useNavigate();
//   const [passwordType, setPasswordType] = useState("password");
//   const [confirmPasswordType, setConfirmPasswordType] = useState("password");

//   const handleBackToLoginClick = () => {
//     navigate("/login");
//   };

//   const handleResetPasswordClick = () => {
//     navigate("/reset-password-step-4");
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordType(passwordType === "password" ? "text" : "password");
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
//   };

//   return (
//     <div className={styles.resetPasswordStep3}>
//       <FrameComponent />
//       <div className={styles.content}>
//         <div className={styles.resetTitleParent}>
//           <div className={styles.resetTitle}>
//             <h1 className={styles.resetPassword}>Reset Password</h1>
//             <div className={styles.chooseANew}>
//               Choose a new password for your account
//             </div>
//           </div>
//           <form className={styles.passwordFields}>
//             <div className={styles.passwordInputs}>
//               <div className={styles.inputLabels}>
//                 <input
//                   className={styles.yourNewPassword}
//                   placeholder="Your new password"
//                   type={passwordType}
//                 />
//                 <img
//                   className={styles.iconoutlineeyeOff}
//                   alt=""
//                   src="/iconoutlineeyeoff.svg"
//                   onClick={togglePasswordVisibility}
//                 />
//               </div>
//               <div className={styles.inputLabels1}>
//                 <input
//                   className={styles.confirmYourNew}
//                   placeholder="Confirm your new password"
//                   type={confirmPasswordType}
//                 />
//                 <img
//                   className={styles.iconoutlineeyeOff1}
//                   alt=""
//                   src="/iconoutlineeyeoff.svg"
//                   onClick={toggleConfirmPasswordVisibility}
//                 />
//               </div>
//             </div>
//             <button
//               type="button"
//               className={styles.resetButton}
//               onClick={handleResetPasswordClick}
//             >
//               <div className={styles.resetPasswordText}>Reset Password</div>
//             </button>
//             <button
//               type="button"
//               className={styles.loginLink}
//               onClick={handleBackToLoginClick}
//             >
//               <div className={styles.backToLogin}>Back to Login</div>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordStep;


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FrameComponent from "../components/FrameComponent";
import styles from "./ResetPasswordStep.module.css";

const ResetPasswordStep = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleBackToLoginClick = () => {
    navigate("/login");
  };

  const handleResetPasswordClick = () => {
    navigate("/reset-password-step-4");
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
