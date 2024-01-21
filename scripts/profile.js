// Global variable to store the document reference of the logged-in user
let currentUser;

$(document).ready(function () {
})

function getProfileUserInfo() {
    // Get the user ID from the URL
    let params = new URL(window.location.href); 
    profile_user_ID = params.searchParams.get("userID"); 
    return profile_user_ID;
}
getProfileUserInfo();
displayButtons();


//-----------------------------------------------------------
// Function to message user
//-----------------------------------------------------------

function displayButtons() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            console.log(user.id)
            
            if (profile_user_ID == user.uid) {
                // only allow user to change profile picture if it is their own profile
                document.getElementById("message-friend").style.display = "none";
                console.log('here')
            } else {
                document.getElementById("edit-save").setAttribute('style', 'display:none !important')
                console.log('here')
            }
        }
    });
}

function sendMessage() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            console.log(user.id)
            db.collection("chatrooms").add({
                users: [user.uid, profile_user_ID]
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                window.location.href = "chatroom.html?chatroomid=" + docRef.id;
            })
        }
    });
}



//-----------------------------------------------------------
// Function to populate user information on the profile page
//-----------------------------------------------------------
function populateUserInfo() {
    // Firebase authentication state change listener
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            // Reference to the user document using the user's UID
            currentUser = db.collection("users").doc(user.uid);

            // Retrieve and populate user information
            currentUser.get().then(userDoc => {
                // Extract user data fields
                const userName = userDoc.data().name;
                const picUrl = userDoc.data().profilePic;
                const userAbout = userDoc.data().about;

                // Populate form fields if data fields are not empty
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userAbout != null) {
                    document.getElementById("userAbout").value = userAbout;
                }
                if (picUrl != null) {
                    document.getElementById("mypic-goes-here").src = picUrl;
                }
            });
        } else {
            // No user is signed in
            console.log("No user is signed in");
        }
    });
}

// Call the function to populate user information
populateUserInfo();

//-----------------------------------------------------------
// Function to enable form fields for editing user information
//-----------------------------------------------------------
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;

    // Change button colors for visual indication
    document.querySelector('.save').classList.remove('btn-secondary');
    document.querySelector('.save').classList.add('btn-success');
    document.querySelector('.edit').classList.remove('btn-success');
    document.querySelector('.edit').classList.add('btn-secondary');
}

//--------------------------------------------------
// Function to save edited user information
//--------------------------------------------------
function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Reference to the storage for user profile pictures
        const storageRef = storage.ref("images/" + user.uid + ".jpg");

        // Asynchronous call to upload File Object (global variable ImageFile) to Cloud Storage
        storageRef.put(ImageFile).then(() => {
            // Asynchronous call to get URL from Cloud Storage
            storageRef.getDownloadURL().then(url => {
                // Get form field values
                // Asynchronous call to update form fields in Firestore
                currentUser.update({
                    profilePic: url
                }).then(() => {
                    // Disable form fields after saving
                    document.getElementById('personalInfoFields').disabled = true;
                });
            });
        });
    });

    // Change button colors back to default
    document.querySelector('.save').classList.remove('btn-success');
    document.querySelector('.save').classList.add('btn-secondary');
    document.querySelector('.edit').classList.remove('btn-secondary');
    document.querySelector('.edit').classList.add('btn-success');

    // Alert the user that their profile has been updated
    Swal.fire({
        title: "Saved",
        text: "Your profile has been updated!",
        icon: "success"
    });
}

// Add click event listener to the sign-out button
document.getElementById("sign-out").addEventListener("click", () => {
    // Call the logout function when the button is clicked
    logout();

    // Redirect to "index.html"
    window.location.href = "index.html";
});

// Add click event listener to the about button
// document.getElementById("about").addEventListener("click", () => {
//     // Redirect to "about.html"
//     window.location.href = "about.html";
// });

// Add click event listener to the message button
document.getElementById("message-friend").addEventListener("click", () => {
    // message friend"
    console.log('message friend')
    sendMessage();
});

// Global variable to store the File Object reference for user profile picture
let ImageFile;

//--------------------------------------------------
// Function to handle file input and update preview
//--------------------------------------------------
function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input"); // Pointer #1
    const image = document.getElementById("mypic-goes-here"); // Pointer #2

    // Attach listener to input file
    // When this file changes, do something
    fileInput.addEventListener('change', e => {
        ImageFile = e.target.files[0];
        const blob = URL.createObjectURL(ImageFile);
        image.src = blob; 
    });
}

// Run the function to enable file input listener
chooseFileListener();
