import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFields from '../components/RegisterInputFields/InputFields';
import styles from './SignUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginClick = () => {
    navigate('/login');
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isFormValid = () => {
    const { firstName, lastName, email, password, confirmPassword, isChecked } = formData;
    return (
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        isEmailValid(email) &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        isChecked &&
        password === confirmPassword
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    const registerData = {
      username: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      password: formData.password,
      role: 'User', // Assuming the role is fixed as 'User'
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log('User registered successfully:', data);
        navigate('/verify-otp');
      } else {
        // Handle registration errors
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration. Please try again.');
      console.error('An error occurred during registration:', error);
    }
  };

  return (
      <div className={styles.signUp3}>
        <div className={styles.backgroundParent}>
          <img className={styles.backgroundIcon} alt="" src="/background.svg" />
          <div className={styles.headerContent}>
            <img className={styles.logoIcon} loading="lazy" alt="" src="/logo.svg" />
            <h1 className={styles.blogsToDive}>Blogs to dive into tech</h1>
          </div>
        </div>
        <div className={styles.loginOptionsParent}>
          <div className={styles.loginOptions}>
            <h1 className={styles.createAccount}>Create account</h1>
            <div className={styles.alreadyHaveAnContainer}>
              <span>{`Already have an account? `}</span>
              <span className={styles.login} onClick={handleLoginClick}>Login</span>
            </div>
          </div>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <form className={styles.signUpForm} onSubmit={handleSubmit}>
            <InputFields formData={formData} setFormData={setFormData} />
            <button
                className={`${styles.submitButton} ${!isFormValid() ? styles.disabledButton : ''}`}
                type="submit"
                disabled={!isFormValid()}
            >
              <b className={styles.createAccount1}>Create Account</b>
            </button>
          </form>
        </div>
      </div>
  );
};

export default SignUp;
