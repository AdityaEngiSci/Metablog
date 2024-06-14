import { useState } from 'react';
import styles from './InputFields.module.css';

const InputFields = ({ className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={[styles.inputFields, className].join(" ")}>
      <div className={styles.nameFields}>
        <div className={styles.nameInputs}>
          <input
            className={styles.firstName}
            placeholder="First Name"
            type="text"
          />
        </div>
        <div className={styles.nameInputs1}>
          <input
            className={styles.lastName}
            placeholder="Last Name"
            type="text"
          />
        </div>
      </div>
      <div className={styles.accountInfo}>
        <input className={styles.email} placeholder="Email" type="text" />
      </div>
      <div className={styles.accountInfo1}>
        <input
          className={styles.password}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />
        <img
          className={styles.iconoutlineeyeOff}
          alt=""
          src="/iconoutlineeyeoff.svg"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.accountInfo2}>
        <input
          className={styles.confirmPassword}
          placeholder="Confirm  Password"
          type={showConfirmPassword ? "text" : "password"}
        />
        <img
          className={styles.iconoutlineeyeOff1}
          alt=""
          src="/iconoutlineeyeoff-1.svg"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.termsAgreement}>
        <input className={styles.agreementCheck} type="checkbox" />
        <div className={styles.iAgreeToContainer}>
          <span>{`I agree to MetaBlog `}</span>
          <span className={styles.termsOfService}>Terms of service</span>
          <span>{` and `}</span>
          <span className={styles.privacyPolicy}>Privacy policy</span>
        </div>
      </div>
    </div>
  );
};

export default InputFields;

