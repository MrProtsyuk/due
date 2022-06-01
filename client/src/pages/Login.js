import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/helpers';

const  Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_USER);
    const [err, setErr] = useState('');
    
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

    // Validation
    if(!validateEmail(formState.email)){
      setErr('You must enter a valid email address');
      return;
    }

    if(!formState.password){
      setErr('You must enter a password');
      return;
    }

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        if(error.message.indexOf('credential') != -1){
          setErr('User not found')
        }
      }
    }
  };

  return (
    <>
    <form onSubmit={handleFormSubmit}>
        <div id="login">
            <h2>Login</h2>

            <div className="center">
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
                <button type="submit" className="button-main">Login</button>
            </div>

            <div className="mt10 center">
                Don't have an account? <Link to='/signup'>Sign up here</Link>
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
}

export default Login;