
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ResetPasswordStep1.module.css";

const ResetPasswordStep1 = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={[styles.resetPasswordStep4, className].join(" ")}>
      <div className={styles.main}>
        <img className={styles.backgroundIcon} alt="" src="/background.svg" />
        <div className={styles.header}>
          <img
            className={styles.logoIcon}
            loading="lazy"
            alt=""
            src="/logo.svg"
          />
          <h1 className={styles.blogsToDive}>Blogs to dive into tech</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.successContainer}>
          <div className={styles.successInner}>
            <div className={styles.successMessage}>
              <div className={styles.checkmarkContainer}>
              </div>
              <div className={styles.passwordResetSuccessfully}>
                Password reset successfully
              </div>
            </div>
            <div className={styles.loginContainer} onClick={handleLoginClick}>
              <div className={styles.login}>Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResetPasswordStep1.propTypes = {
  className: PropTypes.string,
};

export default ResetPasswordStep1;
