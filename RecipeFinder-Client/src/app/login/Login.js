import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, ErrorMessage } from '../../components';
import './login.scss';
import { login } from '../../services/userService';

function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { email, password } = formValues;

  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ ...formValues })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((errMessage) => {
          if (response.status === 404) {
            throw new Error(errMessage);
          } else {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        });
      })
      .then((res) => {
        setErrorMessage('');
        localStorage.setItem('user', JSON.stringify(res));
        navigate('/home');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="loginForm-container">
        <div>
          <Input
            onChange={handleChange('email')}
            type="text"
            name="email"
            value={email}
            label="Email"
          />
        </div>
        <div>
          <Input
            onChange={handleChange('password')}
            type="password"
            name="password"
            value={password}
            label="Password"
          />
        </div>
        <div className="errormessage-container"><ErrorMessage message={errorMessage} /></div>
        <Button
          type="submit"
          label="Login"
        />
        <p>
          Don&apos;t have an account yet?
          {' '}
          <a className="register-login-a" href="/register">Register</a>
        </p>
      </div>
    </form>
  );
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Login</h1>
        {loginForm()}
      </div>
    </div>
  );
}
export default Login;
