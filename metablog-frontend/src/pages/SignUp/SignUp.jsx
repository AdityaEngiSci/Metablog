import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFields from '../../components/RegisterInputFields/InputFields';
import styles from './SignUp.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
    comingFrom: 'signup',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const base_url = process.env.REACT_APP_BASE_URL;


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
    if (!isFormValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out all fields correctly.',
      });
      return;
    }

    const registerData = {
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: 'User', // Assuming the role is fixed as 'User'
    };

    try {
      const response = await axios.post(`${base_url}/auth/register`, registerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Handle successful registration
        console.log('User registered successfully:', response.data);
        const { accessToken } = response.data.data;

        // Store tokens in local storage
        localStorage.setItem('accessToken', accessToken);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Please check your email. We have sent you an OTP for verification.',
        }).then(() => {
          navigate('/verify-otp', { state: { email: formData.email, comingFrom: formData.comingFrom } }); // Pass email in state
        });
      } else {
        // Handle registration errors
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: response.data.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Swal.fire({
          icon: 'error',
          title: 'oops!',
          text: error.response.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response received from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An error occurred during registration. Please try again.');
      }
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
