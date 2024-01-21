// Global variable to store the document reference of the logged-in user
let currentUser;

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
                const userCountry = userDoc.data().country;
                const userCity = userDoc.data().city;
                const picUrl = userDoc.data().profilePic;
                const userAbout = userDoc.data().about;

                // Populate form fields if data fields are not empty
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userCountry != null) {
                    document.getElementById("countryInput").value = userCountry;
                }
                if (userCity != null) {
                    document.getElementById("cityInput").value = userCity;
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
                const userName = document.getElementById('nameInput').value;
                const userCountry = document.getElementById('countryInput').value;
                const userCity = document.getElementById('cityInput').value;

                // Asynchronous call to update form fields in Firestore
                currentUser.update({
                    name: userName,
                    country: userCountry,
                    city: userCity,
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

// Run the function to fetch and update additional user information
getOtherInfoFromDB();

// Add click event listener to the sign-out button
document.getElementById("sign-out").addEventListener("click", () => {
    // Call the logout function when the button is clicked
    logout();

    // Redirect to "index.html"
    window.location.href = "index.html";
});

// Add click event listener to the about button
document.getElementById("about").addEventListener("click", () => {
    // Redirect to "about.html"
    window.location.href = "about.html";
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
        // The change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        const blob = URL.createObjectURL(ImageFile);

        // Change the DOM img element source to point to this file
        image.src = blob; // Assign the "src" property of the "img" tag
    });
}

// Run the function to enable file input listener
chooseFileListener();
