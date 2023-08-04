import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, ErrorMessage } from '../../components';
import { register } from '../../services/userService';

function Registration() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { name, email, password, repeatedPassword } = formValues;

  const handleChange = (val) => (event) => {
    setFormValues({ ...formValues, [val]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.password !== formValues.repeatedPassword) {
      setErrorMessage("passwords don't match");
      return;
    }
    setErrorMessage('');
    register({ name, email, password })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((errMessage) => {
          if (response.status === 409) {
            throw new Error(errMessage);
          } else {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        });
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        navigate('/home');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const registrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="loginForm-container">
        <div>
          <Input
            onChange={handleChange('name')}
            type="text"
            name="name"
            value={name}
            label="Username"
          />
        </div>
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
        <div>
          <Input
            onChange={handleChange('repeatedPassword')}
            type="password"
            name="repeatedPassword"
            value={repeatedPassword}
            label="Repeat Password"
          />
        </div>
        <div className="errormessage-container"><ErrorMessage message={errorMessage} /></div>
        <Button
          type="submit"
          label="Register"
        />
        <p>
          Already have an account?
          {' '}
          <a className="register-login-a" href="/login">Login</a>
        </p>
      </div>
    </form>
  );
  return (
    <div className="login-container">
      <div className="login-wrapper registration">
        <h1>Sign up</h1>
        {registrationForm()}
      </div>
    </div>
  );
}

export default Registration;
