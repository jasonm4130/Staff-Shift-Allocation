import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './_components/navbar';
import CreateStaff from './_components/createStaff';
import CreateShift from './_components/createShift';

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
                </div>
            </div>
        </Router>
    );
}

export default App;
