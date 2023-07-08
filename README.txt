Overview:
This is a photoboard application that allows users to create profiles, upload photos, and
interact with other user's posts, similar to Instagram. The app will use a React TypeScript UI and a Firebase backend.
The overall development plan is to develop the UI first and then create the backend. The app uses React Routing and 
stores its pages in different components, with each page containing sub components based on its functions. The App.jsx 
file will then render the specific component based on which route is being accessed. This file documents the planning 
behind the application as I develop each page and functionality.

Set up and dependencies:
Development environment requires node 16 or higher.
Run "npm create vite@latest" and select React and then TypeScript. Follow the given instructions.
Run "npm install react-router-dom" to get React Routing.
Run using "npm run dev" command to run the program.
Uses bootstrap using the command "npm install bootstrap@latest". 
Run "npm install bootstrap-icons" to get the icons.

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
Add the post form and comment form
Arrange post display on profile page.
Add searchbar
Create home page and feed

Implementation plan (Backend):
Connect to firebase API and set up database
Create user authentication system
Modify the navigation bar to display different links based on whether the user is logged in or not
Create the backend for the profile editing/creation
Create the searching system
Add a follower/following system in the database
Create the backend for the post uploading, editing
Add backend post interaction with likes and comments

Future enhancements:
Find a way to display the photos uploaded in AddPost component.
Find a better like icon.

Maintenance:
Brainstorm additional features
Clean up the documentation
UI enhancements

Navigation bar:
A basic header bar with routing links to render the other components. When designing the UI, I'll 
try having it receive a login status prop that will make it decide which links to display.
The links are separated into their own component to avoid bootstrap duplication and to add in the 
rendering logic.

Login and signup pages:
Create standard pages with email, username, and password parameters.
The login page is set as the default page and uses a state to determine
if it should be rendered. This is based on whether a navbar link that isn't
the home page has been clicked; once a non homepage navbar link is clicked, 
an onclick function passed through the app.tsx file disables the login page
rendering so that there aren't 2 forms showing up on the same page.

Profile:
Display username, email, password, photo. The photo background will be default with the 
square div being the same color of the background of the website
Have form to change password or photo.
Have a display of posts and followers/following.
The profile picture will be displayed throughout the site once the
user is logged in so that will be a separate component. The posts will 
also be a separate component. Create the page to edit the profile.

Post:
Make the page to add the post which should allow the user to upload multiple photos
and a single caption. Add the styling Make the component with a post which should have a 
carousel that can be navigated and a caption maybe contained in a bootstrap card.
Test by hardcoding in the images from the folder. Then you need to add like and 
comment buttons on the card. The like button should turn red/white depending on the 
click and the comment button should make a text box and submit button appear, maybe 
in another component. There should also be a separate page to view every comment which
should be displayed underneath the caption. 