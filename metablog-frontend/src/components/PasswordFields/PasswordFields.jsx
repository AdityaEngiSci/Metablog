import PropTypes from "prop-types";
import styles from "./PasswordFields.module.css";

const PasswordFields = ({ className = "" }) => {
  return (
    <form className={[styles.passwordFields, className].join(" ")}>
      <div className={styles.passwordInputs}>
        <div className={styles.inputLabels}>
          <input
            className={styles.yourNewPassword}
            placeholder="Your new password"
            type="text"
          />
          <img
            className={styles.iconoutlineeyeOff}
            alt=""
            src="/iconoutlineeyeoff.svg"
          />
        </div>
        <div className={styles.inputLabels1}>
          <input
            className={styles.confirmYourNew}
            placeholder="Confirm your new password"
            type="text"
          />
          <img
            className={styles.iconoutlineeyeOff1}
            alt=""
            src="/iconoutlineeyeoff.svg"
          />
        </div>
      </div>
      <button className={styles.resetButton}>
        <div className={styles.resetPassword}>Reset Password</div>
      </button>
      <button className={styles.loginLink}>
        <div className={styles.backToLogin}>Back to Login</div>
      </button>
    </form>
  );
};

PasswordFields.propTypes = {
  className: PropTypes.string,
};

export default PasswordFields;
