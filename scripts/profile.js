// Global variable to store the document reference of the logged-in user
let currentUser;

//-----------------------------------------------------------
// Function to populate user information on the profile page
//-----------------------------------------------------------

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            currentUser = db.collection("users").doc(user.uid);
            // Do something for the user here.
            console.log("User is signed in");
            console.log(user);
            // Populate the user information on the profile page
            currentUser.get().then(userDoc => {
                const userName = userDoc.data().name;
                const userCountry = userDoc.data().email;
                const userCity = userDoc.data().city;
                const userPicture = userDoc.data().picture;
            })

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

        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });

}

populateUserInfo();