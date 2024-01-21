// Global variable to store the document reference of the logged-in user
let currentUser;

//-----------------------------------------------------------
// Function to populate user information on the profile page
//-----------------------------------------------------------

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            currentUser = db.collection("users").doc(users.uid);
            // Do something for the user here.
            console.log("User is signed in");
            console.log(users.uid);
            console.log(currentUser)
            // Populate the user information on the profile page
            currentUser.get().then(userDoc => {
                const userName = userDoc.data().name;
                const userCountry = userDoc.data().email;
                const userCity = userDoc.data().city;
                const userPicture = userDoc.data().picture;

                if (userName != null) {
                    document.getElementById("user-name").innerHTML = userName;
                }
                if (userCountry != null) {
                    document.getElementById("user-country").innerHTML = userCountry;
                }
                if (userCity != null) {
                    document.getElementById("user-city").innerHTML = userCity;
                }
                if (userPicture != null) {
                    document.getElementById("user-picture").innerHTML = userPicture;
                }
                if (userPicture != null) {
                    document.getElementById("user-about").innerHTML = userAbout;
                }
            })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });

}

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
    firebase.auth().onAuthStateChanged(users => {
        // Reference to the storage for user profile pictures
        const storageRef = storage.ref("images/" + users.uid + ".jpg");

        // Asynchronous call to upload File Object (global variable ImageFile) to Cloud Storage
        storageRef.put(ImageFile).then(() => {
            // Asynchronous call to get URL from Cloud Storage
            storageRef.getDownloadURL().then(url => {
                // Get form field values
                const userName = document.getElementById('user-name').value;
                const userCountry = document.getElementById('user-country').value;
                const userCity = document.getElementById('user-city').value;
                const userAbout = document.getElementById('user-about').value;

                // Asynchronous call to update form fields in Firestore
                currentUser.update({
                    name: userName,
                    country: userCountry,
                    city: userCity,
                    about: userAbout,
                    profilePic: userPicture
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