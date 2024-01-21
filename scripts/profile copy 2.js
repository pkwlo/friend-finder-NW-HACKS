let currentUser;
let ImageFile; // Ensure this is defined and updated elsewhere in your code if you're using it

//-----------------------------------------------------------
// Function to populate user information on the profile page
//-----------------------------------------------------------

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            currentUser = db.collection("users").doc(users.uid);
            console.log("User is signed in");
            console.log(users.uid);
            console.log(currentUser);

            // Populate the user information on the profile page
            currentUser.get().then(userDoc => {
                const userData = userDoc.data();
                const userName = userData.name;
                const userCountry = userData.country;
                const userCity = userData.city;
                const userAbout = userData.about;
                const userPicture = userData.picture;

                if (userName) {
                    document.getElementById("user-name").value = userName;
                }
                if (userCountry) {
                    document.getElementById("user-country").value = userCountry;
                }
                if (userCity) {
                    document.getElementById("user-city").value = userCity;
                }
                if (userAbout) {
                    document.getElementById("user-about").value = userAbout;
                }
                if (userPicture) {
                    document.getElementById("my-profile-pic").src = userPicture;
                }
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();

//-----------------------------------------------------------
// Function to enable form fields for editing user information
//-----------------------------------------------------------
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
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
        if (users) {
            const storageRef = storage.ref("images/" + users.uid + ".jpg");
            storageRef.put(ImageFile).then(() => {
                storageRef.getDownloadURL().then(url => {
                    const userName = document.getElementById('user-name').value;
                    const userCountry = document.getElementById('user-country').value;
                    const userCity = document.getElementById('user-city').value;
                    const userAbout = document.getElementById('user-about').value;

                    currentUser.update({
                        name: userName,
                        country: userCountry,
                        city: userCity,
                        about: userAbout,
                        profilePic: url // Assuming this should be the newly uploaded picture URL
                    }).then(() => {
                        document.getElementById('personalInfoFields').disabled = true;
                    }).catch(error => {
                        console.error("Error updating user data:", error);
                    });
                });
            });

            document.querySelector('.save').classList.remove('btn-success');
            document.querySelector('.save').classList.add('btn-secondary');
            document.querySelector('.edit').classList.remove('btn-secondary');
            document.querySelector('.edit').classList.add('btn-success');

            Swal.fire({
                title: "Saved",
                text: "Your profile has been updated!",
                icon: "success"
            });
        }
    });
}
