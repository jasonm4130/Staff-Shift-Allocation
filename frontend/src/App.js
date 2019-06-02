import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './_components/navbar';
import CreateStaff from './_components/createStaff';
import CreateShift from './_components/createShift';
import DisplayStaff from './_components/displayStaff';
import DisplayShifts from './_components/displayShifts';
import Home from './_components/home';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Route
                        exact
                        path="/"
                        component={() => <Home/>}
                    />
                    <Route
                        path="/create-staff"
                        component={() => <CreateStaff />}
                    />
                    <Route
                        path="/create-shift"
                        component={() => <CreateShift />}
                    />
                    <Route
                        path="/staff"
                        component={() => <DisplayStaff />}
                    />
                    <Route
                        path="/shifts"
                        component={() => <DisplayShifts />}
                    />
                </div>
            </div>
        </Router>
    );
}

export default App;
