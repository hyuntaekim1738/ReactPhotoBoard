Overview:
This is a photoboard application that allows users to create profiles, upload photos, and
interact with other user's posts, similar to Instagram. The app will use a React TypeScript UI and a Firebase backend.
The overall development plan is to develop the UI first and then create the backend. The app uses React Routing and 
stores its pages in different components, with each page containing sub components based on its functions. The App.jsx 
file will then render the specific component based on which route is being accessed.

Set up and dependencies:
Development environment requires node 16 or higher.
Run "npm create vite@latest" and select React and then TypeScript. Follow the given instructions.
Run "npm install react-router-dom" to get React Routing.
Run using "npm run dev" command to run the program.
Uses bootstrap using the command npm install bootstrap@latest. 

Functions to implement:
Authentication - Login and Signup pages
Profile - Display user profile information and posts, allow user to edit profile and view posts
Posts - Allow user to create posts
Feed/Interaction - Allow user to like, comment, and view posts in the Feed
Followers - Allow users to follow and be followed by other users
Navigation - Display links to the other functions
Searching - Allow user to search for other profiles

Implementation plan (UI):
Create the navigation bar without the Authentication, then link the pages as each is created
Create the login and signup pages 
Create the profile page
Create the post component and the comment component, add frontend interaction
Add searchbar

Implementation plan (Backend):
Connect to firebase API and set up database
Create user authentication system
Modify the navigation bar to display different links based on whether the user is logged in or not
Create the backend for the profile editing/creation
Add a follower/following system in the database
Create the backend for the post uploading, editing
Add backend post interaction with likes and comments

Navigation bar:
A basic header bar with routing links to render the other components. When designing the UI, I'll 
try having it receive a login status prop that will make it decide which links to display.
Add bootstrap styling

Login and signup pages:
