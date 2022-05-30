import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { validateEmail, checkPassword } from '../utils/helpers';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Form Submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if(!formState.username){
      setErr('Enter a valid username');
      return;
    }

    if(!validateEmail(formState.email)){
      setErr('Enter a valid email');
      return;
    }

    if(!checkPassword(formState.password)){
      setErr('Password must be between 5-20 chars long');
      return;
    }
    // End of Validation

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      if (error instanceof Error) {
        if(error.message.indexOf('duplicate') !== -1 && (error.message.indexOf('username') !== -1)){
          setErr('Username already exists')
        }
        if(error.message.indexOf('duplicate') !== -1 && (error.message.indexOf('email') !== -1)){
          setErr('Email already exists')
        }
      }
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

    {err && (
        <div className="error-text">
            {err}
        </div>
    )}
    </>
)
};

export default Signup;
