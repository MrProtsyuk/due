import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const  Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formType, setFormType] = useState('Login')
  const [login, { error }] = useMutation(LOGIN_USER);
    
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
    <form>
        <div id="login">
            <h2>Login</h2>

            <div className="center">
                <input
                    // value={this.state.email}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Email Address"
                />
                    
                <input
                    // value={this.state.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder='Password'
                />
            </div>

            <div className="center mt20">
                <button className="button-main" onClick={handleFormSubmit}>Login</button>
            </div>

            <div className="mt10 center">
                Don't have an account? <Link to='/signup'>Sign up here</Link>
            </div>
        </div>
    </form>

    {error && (
        <div className="error-text">
            {error}
        </div>
    )}
    </>
)
}

export default Login;