import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
    <header>
      <nav>
        <div>
         <img src={process.env.PUBLIC_URL + '/images/money.png'} height={25} /> 
        </div>
        
        <ul>
          <li><Link to="/">Home</Link></li>
          { localStorage.getItem('id_token')
            ? <li><span onClick={logout}>Logout</span></li>
            : <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              </>
          }

              
          
        </ul>
      </nav>
    </header>

    <h1 className="main-logo">due.</h1>
    </>
)
};

export default Header;