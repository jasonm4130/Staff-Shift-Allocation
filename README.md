# Staff-Shift-Allocation

## Initial Thoughts
Shift allocation will require a few main concepts:
1. Staff members (including hours worked in the current week and availability)
2. Shifts
3. Staff to shift relationship to record which staff members have been assigned to what shifts
4. ability to generate a roster from the proposed schedule

## The Problem
The problem chosen was that of the Staff Shift Allocation. this problem was chosen as I feel it had a good mix of both front and back end functionality.

The backend was built using MongoDB interfaced with Mongoose and NodeJs with GraphQl as an API layer although in the way that I ended up implementing GraphQl it has lost some of it's benefits. This was my first time using GraphQl in a project, it was also my first time implementing a NoSQL database instead of a regular SQL database.

The backend is hosted on Heroku with the GUI for GraphQl enabled here [https://shift-allocation.herokuapp.com/api](https://shift-allocation.herokuapp.com/api) the front end is hosted on a netlify static server here [https://elegant-poincare-4bc22b.netlify.com/](https://elegant-poincare-4bc22b.netlify.com/)

The MongoDB database was chosen to be hosted on MongoDB Atlas as this should provide the most availability and makes it easy for deploying the app anywhere.

## Reasoning Behind Tech Choices
I chose MongoDB and NodeJs as technologies for the backend as I think they are key technologies not just for Adepto but in the web ecosystem in general currently. This also influenced my decision in choosing GraphQl as an API layer as it has been a technology that I have been meaning to learn and this provided a great opportunity to do so.

Trade offs I made because of tech choices were definitely the front end aesthetics and polishedness as I had to learn more about the back end technologies I didn't get to spend as much time on making the front end look as nice or preform as well as I would have liked. With the whole front end of the project being pulled together in a few hours.

Again with the rush to finish the front end, there were a few pieces that I left out. Namely:

* Responsive Navbar (My assumption here being that this will mostly be a system used internally or on desktops with the possibility of more mobile friendly coming soon)
* Limited Staff functionality, I would have liked to add a list of assigned shifts to the staff objects and also been able to cancel shifts from the staff member while also seeing the number of hours out of their maximum capacity they are working. Again this was just down to where I choose to spend the majority of my time in the development process, as all the backend functionality is there.
* Better overall aesthetics. With more time I think I could have made the whole application look and feel much more exiting and an overall better user experience.
* Testing - I am fairly inexperience with testing and as such also did not have time to complete any automated tests on the code, however I did complete manual testing and all key features work correctly.

## Other Work
My other work can be found in my portfolio at [https://jasonmatthew.dev](https://jasonmatthew.dev)

## Hosted Application
As stated above the hosted application can be found [https://elegant-poincare-4bc22b.netlify.com/](https://elegant-poincare-4bc22b.netlify.com/)
