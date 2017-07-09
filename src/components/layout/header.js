import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className= "navbar-header">
            <Link className="navbar-brand" to="/">
                <img  src={'../../assets/img/logo.png'} />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
