Overview:
This is a photoboard application that allows users to create profiles, upload photos, and
interact with other user's posts, similar to Instagram. The app will use a React TypeScript UI and a Firebase backend.
The overall development plan is to develop the UI first and then create the backend.

Functions to implement:
Authentication - Login and Signup pages
Profile - Display user profile information and posts, allow user to edit profile and view posts
Posts - Allow user to create posts
Feed/Interaction - Allow user to like, comment, and view posts in the Feed
Followers - Allow users to follow and be followed by other users
Navigation - Display links to the other functions

Implementation plan (UI):
Create the navigation bar without the Authentication, then link the pages as each is created
Create the login and signup pages 
Create the profile page
Create the post component and the comment component, add frontend interaction

Implementation plan (Backend):
Connect to firebase API and set up database
Create user authentication system
Modify the navigation bar to display different links based on whether the user is logged in or not
Create the backend for the profile editing/creation
Add a follower/following system in the database
Create the backend for the post uploading, editing
Add backend post interaction with likes and comments