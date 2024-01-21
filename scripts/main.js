$(document).ready(function () {
    checkQuestionnaire();

});


async function checkQuestionnaire() {
    var user_tags = [];
    var user_interests = [];

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            await db.collection("questionnaire").where("user_id", "==", user.uid).get().then(
                results => {
                    results.forEach(result => {
                        user_interests.push(result.data().interests);
                        user_tags.push(result.data().hangout);
                        user_tags.push(result.data().chat);
                        user_tags.push(result.data().outdoor);
                        user_tags.push(result.data().location);
                    })
                }
            )
                .then(() => {
                    if (user_tags.length == 0) {
                        window.location.assign("questionnaire.html");
                    }
                })
            // console.log(user_tags);
            matchUsers(user_tags, user_interests);
            populateUserByScore(user.uid);
        }
    })

}

//Loop through all users and compare tags and give each user a score according to how many tags they have in common with the current user
async function matchUsers(user_tags, user_interests) {
    console.log("matching")
    var current_user_id = firebase.auth().currentUser.uid;
    // console.log(current_user_id);

    await db.collection("questionnaire").get().then(
        allUsers => {
            allUsers.forEach(user => {
                var score = 0;
                var next_user_tags = [];
                var next_user_interests = [];
                var other_user_id = user.data().user_id;


                if (user.data().user_id != firebase.auth().currentUser.uid) {
                    next_user_interests.push(user.data().interests);
                    next_user_tags.push(user.data().hangout);
                    next_user_tags.push(user.data().chat);
                    next_user_tags.push(user.data().outdoor);
                    next_user_tags.push(user.data().location);

                    for (var i = 0; i < user_tags.length; i++) {
                        if (user_tags[i] == next_user_tags[i]) {
                            score++;
                        }
                    }

                    for (var i = 0; i < user_interests[0].length; i++) {
                        if (next_user_interests[0].includes(user_interests[0][i])) {
                            score++;
                        }
                    }
                    // console.log(score);

                    //update the score in the user's document in the database
                    const otherUserDocRef = db.collection("users").doc(current_user_id)
                        .collection("other_users").doc(other_user_id);

                    const newData = {
                        name: other_user_id,
                        score: score
                    };

                    // Use set with merge: true to update or add the document
                    otherUserDocRef.set(newData, { merge: true })
                        .then(() => {
                            console.log("Document successfully updated or added!");
                        })
                        .catch((error) => {
                            console.error("Error updating or adding document: ", error);
                        });
                }
            })
        })

}

// Sort users except yourself by score
async function populateUserByScore(current_user_id) {
    console.log("populating");
    const cardTemplate = document.getElementById("matchTemplate");
    const friendsList = [];

    // Fetch all users except yourself
    await db.collection("users").doc(current_user_id).collection("other_users").get()
        .then(querySnapshot => {
            querySnapshot.forEach(userDoc => {
                const userData = userDoc.data();
                friendsList.push(userData);
            });
        })
        .catch(error => {
            console.error("Error getting user documents:", error);
        });


    console.log(friendsList)

    // Sort the friendsList by score in descending order
    friendsList.sort((a, b) => b.score - a.score);

    // Display the top 10 users in the UI
    const topUsers = friendsList.slice(0, 10);
    topUsers.forEach(user => {
        const cardClone = cardTemplate.content.cloneNode(true);
        db.collection("users").doc(user.name).get()
            .then(userDoc => {
                if (userDoc.exists) {
                    const questionnaireCollection = db.collection("questionnaire");
                    const userQuery = questionnaireCollection.where("user_id", "==", user.name);
                    userQuery.get()
                        .then(querySnapshot => {
                            if (!querySnapshot.empty) {
                                const userDocu = querySnapshot.docs[0];
                                const userData = userDocu.data();
                                console.log(userData);
                                cardClone.querySelector(".card-title").textContent = userDoc.data().name;
                                cardClone.querySelector(".images").textContent = userDoc.data().photo;
                                cardClone.querySelector(".card-location").textContent = userData.location;
                                cardClone.querySelector(".card-hangout").textContent = userData.hangout;
                                cardClone.querySelector(".card-chat").textContent = userData.chat;
                                cardClone.querySelector(".card-interests").textContent = userData.interests;
                                cardClone.querySelector(".description").textContent = userData.description;
                                cardClone.querySelector(".card-outdoor").textContent = userData.outdoor;
            
                                cardClone.querySelector('button').id = 'add-' + user.name;
                                cardClone.querySelector('button').onclick = () => addFriend(current_user_id, user.name);

                                document.getElementById("matches-go-here").appendChild(cardClone);
                            } else {
                                console.log("No matching document found");
                            }
                        })
                }
            });
    })
}

//Send a friend request and set friend status to pending in firebase
function addFriend(current_user_id, friendReq) {
    
}