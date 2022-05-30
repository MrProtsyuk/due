import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <form onSubmit={handleFormSubmit}>
        <div id="login">
            <h2>Sign Up</h2>

            <div className="center">
                <input
                    value={formState.username}
                    name="username"
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                />

                <input
                    value={formState.email}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Email Address"
                />
                    
                <input
                    value={formState.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder='Password'
                />
            </div>

            <div className="center mt20">
                <button type="submit" className="button-main">Sign Up</button>
            </div>

            <div className="mt10 center">
                Already have an account? <Link to='/login'>Log in here</Link>
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
};

export default Signup;
