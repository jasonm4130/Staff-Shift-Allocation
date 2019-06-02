import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">Shift Allocation</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/create-staff" className="nav-link">Create Staff</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create-shift" className="nav-link">Create Shift</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/staff" className="nav-link">Staff</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shifts" className="nav-link">Shifts</Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}
