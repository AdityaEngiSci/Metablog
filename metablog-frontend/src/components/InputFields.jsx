
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './InputFields.module.css';

const InputFields = ({ formData, setFormData, className = '' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className={[styles.inputFields, className].join(' ')}>
      <div className={styles.nameFields}>
        <div className={styles.nameInputs}>
          <input
            className={styles.firstName}
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.nameInputs1}>
          <input
            className={styles.lastName}
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.accountInfo}>
        <input
          className={styles.email}
          placeholder="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.accountInfo1}>
        <input
          className={styles.password}
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <img
          className={styles.iconoutlineeyeOff}
          alt=""
          src="/iconoutlineeyeoff.svg"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={styles.accountInfo2}>
        <input
          className={styles.confirmPassword}
          placeholder="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <img
          className={styles.iconoutlineeyeOff1}
          alt=""
          src="/iconoutlineeyeoff-1.svg"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={styles.termsAgreement}>
        <input
          type="checkbox"
          className={styles.agreementCheck}
          name="isChecked"
          checked={formData.isChecked}
          onChange={handleChange}
        />
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

InputFields.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default InputFields;


