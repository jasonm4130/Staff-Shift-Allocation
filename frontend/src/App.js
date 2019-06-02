import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './_components/navbar';
import CreateStaff from './_components/createStaff';
import CreateShift from './_components/createShift';
import DisplayStaff from './_components/displayStaff';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
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
                </div>
            </div>
        </Router>
    );
}

export default App;
