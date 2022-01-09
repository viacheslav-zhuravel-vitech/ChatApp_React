import React, { useContext, useState } from 'react';
import loginPageStyle from './login-page.module.scss';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const userContext = useContext(UserContext);

  const [loginData, changeLoginData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    userContext.createAndSetCurrentUser(signUpData);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    userContext.loginAndSetCurrentUser(email, password);
    changeLoginData({ email: '', password: '' });
  };

  const handleChangeLogin = (e) => {
    const { value, name } = e.target;
    changeLoginData({ ...loginData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <h1>Super Chat App</h1>
        <h2>I already haw an account</h2>
        <span> Log in with your email and password </span>
        <input
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChangeLogin}
          placeholder="email"
          required
        />
        <input
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChangeLogin}
          placeholder="password"
          required
        />
        <button type="submit" disabled={false}>
          Log In
        </button>
      </form>
      <form onSubmit={handleSubmitRegistration}>
        <h2>Or</h2>
        <span> Create new account with email and password </span>
        <input
          type="email"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="name"
          value={signUpData.confirmPassword}
          onChange={handleChange}
          placeholder="User Name"
          required
        />
        <button type="submit" disabled={false}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Login;
