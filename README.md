## Project Title
Friend Finder


## 1. Project Description
Friend Finder is an innovative web application designed to help individuals discover new friendships based on shared interests. Recognizing that making friends can become challenging after finishing school, Friend Finder offers a unique solution. Users can search for potential friends using a variety of filters, including hobbies, interests, and location. Our extensive database allows users to connect with others who share similar passions. A standout feature of Friend Finder is the community-driven aspect—users can contribute by organizing meetups or sharing local community events, fostering a sense of belonging and making the process of finding friends more organic and enjoyable.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Patricia Lo! I am excited for my first hackathon! I can't wait to see what our team creates with the 24 hour time limit and how much we can learn from this experience.
* My name is Alice Huang, I am excited too!!!.
* My name is Yang Guo, and I'm excited to work on this project and learn about designing and creating a web app. 
* My name is Cai (Steven) Yan. I'm excited to work on this to gain experience with working with a team and web design.
	
## 3. Technologies and Resources Used
* HTML, CSS, JavaScript, JQuery
* Firebase, Firebase storage, Firestore

## 4. Complete setup/installation/usage
### 1. Visit the Website
   - Go to the official website of "Friend Finder" by entering the URL in your web browser.

### 2. User Registration
   - If you're a new user, click on the "Sign Up" or "Register" button.
   - Fill in the required information, including your name, email address, and create a password.
   - Click on the "Register" button to create your account.

### 3. Login to the Account
   - After registration, click on the "Login" button.
   - Enter your email and password.
   - Click on the "Login" button to access your account.

### 4. Answer questionnaire
   - Answer a quick batch of questions and set up your interests.

### 5. Look for friends who share the same interest
   - See a list of profiles who matched your interest.
   - Click user profiles to read further about them.

### 6. Send them a message and connect
   - In the profile page, there is a message option which allows users to direct message each other.

### 7. Talk about your hobbies, passions, plan events through messaging
   - The stage is yours, talk to your new friend and share your passions.

### 8. Profile Page
   - Click on your profile icon to access your profile page.
   - See the information of your profile and ensure it reflects your preferences.
   - If you're on another user's page you will have the ability to send messages.

### 9. Modify Profile
   - On your profile page, find the "Edit" option.
   - Update your personal information as needed.
    
### 10. About
   - Know our team in the about page and read our mission.

### 11. Logout (Optional)
   - If you're using a shared computer or for security reasons, find the logout option and click to log out securely.


## 5. Known Bugs and Limitations
- **Unverified User-Information:**
  - We have not implemented any error checking for user info, so it can be any input at the moment.

- **No send/ accept friend request option:**
  - Due to time constraints, we did not have time to implement a system that allows sending/ receiving friend requests.
  - Currently, direct message is enabled as a temporary solution.

- **Filtering out potentially harmful content & report system:**
  - There is no system in place to filter out inappropriate words and messages.
  - We hope to implement a report system in the future.


## 6. Features for Future
1. **Add text encryption:**
   - Implement cryptography to securely store messages.

2. **Add friend request:**
   - Implement method to allow users to send and receive friend request and database storing these requests.

3. **Enhance visual layout of web application:**
   - Adjust UI of website to follow external heuristics.

4. **Review and Validation for User Uploads:**
   - Implement a review process for user information to ensure the validity and accuracy of information.

5. **Allow users to favorite chats:**
   - Give the user the ability to favorite specific chats so it shows up at the top.

These planned features aim to enhance the functionality and user experience of the "Friend Finder" web application in the future.
	
## 7. Contents of Folder
### Top level of project folder: 

```
├── .firebase                    # Firebase generated file
├── images                       # Folder for images
├── scripts                      # Folder for Javascript files
├── styles                       # Folder for CSS file
├── text                         # Folder for text files
├── .firebaserc                  # Firebase generated file
├── .gitignore                   # Gitignore file
├── about.html                   # HTML page containing all the information about The Friend Finder team
├── favicon.ico                  # Firebase generated file
├── firebase.json                # Firebase generated file
├── firestore.indexes.json       # Firebase generated file
├── firestore.rules              # Firebase generated file
├── index.html                   # HTML file of landing page, this is what users see if they aren't logged in
├── login.html                   # HTML file of user login page
├── main.html                    # HTML file of page after user is logged in
├── profile.html                 # HTML file of profile page, where user can see all the information associated with their account
├── README.md                    # Complete project description
├── chatroom_collection.html     # HTML file of all chat rooms user is in
├── storage.rules                # Firebase generated file
└── template.html                # HTML file of the template
```
### Sub folders and files:

```
├── images                              # Folder for images
        └── # default_profile.png       # Picture of default profile image
        └── # logo.png                  # Picture of logo

├── scripts                             # Folder for scripts
        └── # add_to_list.js                  
        └── # authorization.js          # Firebase authentication       
        └── # chatroom_collection.js    # Based on the chat rooms the user has, it displays it here
        └── # chatroom.js               # Enables the chat room feature for our application
        └── # firebase-config.js        # Links the web app to the firebase database and storage
        └── # questionnaire.js          # Records user's choices for hobbies, location and passion
        └── # profile.js                # Display users' info on the profile page, allow users to modify their info, also allows other users to send them a message
        └── # scripts.js                # Log out users
        └── # share.js                  # Takes data from the form field and uploads it to the firebase database, and firebase 
        └── # skeleton.js               # Nav bar and footer depend on if users log in
├── styles                              # Folder for styles
        └── style.css                   # Main CSS file
├── text                                # Folder for skeleton HTML files
        ├── footer_after_login.html     # HTML footer to be displayed to any users who has been authenticated
        ├── footer_before_login.html    # HTML footer to be displayed to any users who has not been authenticated
        ├── nav_after_login.html        # HTML nav bar to be displayed to any users who has been authenticated
        └── nav_before_login.html       # HTML nav bar to be displayed to any users who has not been authenticated
```


