import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, Button } from '../../components';
import './login.scss';

function Login() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formValues;

  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify(formValues));
    navigate('/home');
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="loginForm-container">
        <div>
          <InputField
            onChange={handleChange('username')}
            type="text"
            name="username"
            value={username}
            label="username"
          />
        </div>
        <div>
          <InputField
            onChange={handleChange('password')}
            type="password"
            name="password"
            value={password}
            label="Password"
          />
        </div>
        <Button type="submit" label="Sign in" />
      </div>
    </form>
  );
  return (
    <div>
      <div className="login-wrapper">
        <h1>Sign in</h1>
        {loginForm()}
      </div>
    </div>
  );
}
export default Login;
