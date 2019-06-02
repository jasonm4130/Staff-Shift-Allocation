import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './_components/navbar';
import CreateStaff from './_components/createStaff';
import CreateShift from './_components/createShift';
<<<<<<< HEAD
import DisplayStaff from './_components/displayStaff';
=======
>>>>>>> 8d1b1ea5d668929406607c1ad2415b8abcf82b87

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
<<<<<<< HEAD
                    <Route
                        path="/staff"
                        component={() => <DisplayStaff />}
                    />
=======
>>>>>>> 8d1b1ea5d668929406607c1ad2415b8abcf82b87
                </div>
            </div>
        </Router>
    );
}

export default App;
