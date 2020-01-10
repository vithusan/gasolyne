import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className="header">
                <Link to='/' className="logo">
                    <h1>Gasolyne</h1>
                    <img src="https://www.freeiconspng.com/uploads/oil-and-gas-icon-oil--gas-32.png" alt="icon" className="iconPng" />
                </Link>
                <input type="text" placeholder="Search" className="navbarSearch" />
                <i class="material-icons md-40">
                    perm_identity
                </i>
            </div>
        );
    }
}

export default Navbar;