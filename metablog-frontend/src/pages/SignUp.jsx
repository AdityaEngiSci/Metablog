import InputFields from "../components/InputFields";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.signUp3}>
      <div className={styles.backgroundParent}>
        <img className={styles.backgroundIcon} alt="" src="/background.svg" />
        <div className={styles.headerContent}>
          <img
            className={styles.logoIcon}
            loading="lazy"
            alt=""
            src="/logo.svg"
          />
          <h1 className={styles.blogsToDive}>Blogs to dive into tech</h1>
        </div>
      </div>
      <div className={styles.loginOptionsParent}>
        <div className={styles.loginOptions}>
          <h1 className={styles.createAccount}>Create account</h1>
          <div className={styles.alreadyHaveAnContainer}>
            <span>{`Already have an account? `}</span>
            <span className={styles.login}>Login</span>
          </div>
        </div>
        <form className={styles.signUpForm}>
          <InputFields />
          <button className={styles.submitButton}>
            <b className={styles.createAccount1}>Create Account</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

