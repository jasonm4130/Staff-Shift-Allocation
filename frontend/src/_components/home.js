import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="m-t-75">
                <h1>Shift Roster Allocation</h1>
                <p>A simple application to create Staff Members and Shifts and then assign the staff members to the shifts.</p>
                <p>The Application has been built out with MongoDB as a NoSQL database with an mongoose / graphQL backend. This is my second project in NodeJs as a backend and my first with GraphQl as an API.</p>
                <p>The front end has been built out with React, using Create React App and React Router. As the app is fairly simple no state management library such as redux has been used.</p>
                <p>With the opportunity to spend more time on the app I would focus more heavily on the front end as there are still some areas that need polishing, namely the Navbar and the display of Staff members shifts.</p>
                <p>Ideally this app would also be behind some auth to allow for different levels of functionality, with managers being able to access and edit all functions, with lower access level staff members only able to view and edit their own data.</p>
                <p>Feel free to have a look around. I suggest starting out with creating a Staff member and some Shifts to assign them to.</p>
                <p>It would also be beneficial to add in to the application the ability for managers to display a nicely formatted runsheet of the weekend / week. To get a good overview of everyone rostered on.</p>
            </div>
        )
    }
}
