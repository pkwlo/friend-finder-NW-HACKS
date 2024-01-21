$(document).ready(function () {
    checkQuestionnaire();
    
});

var user_tags = [];
var user_interests = [];

async function checkQuestionnaire() {
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
        }
    })
    
}

//Loop through all users and compare tags and give each user a score according to how many tags they have in common with the current user
function matchUsers(user_tags, user_interests) {
    db.collection("questionnaire").get().then(
        allUsers => {
            allUsers.forEach(user => {
                var score = 0;
                var next_user_tags = [];
                var next_user_interests = [];
                var other_user_id = user.data().user_id;
                var current_user_id = firebase.auth().currentUser.uid;

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
                    console.log(score);

                    //add the score to the user's document in the database
                    db.collection("users").doc(current_user_id).collection("other_users").add(
                        {   name: other_user_id,
                            score: score
                        })
                }
            })
        })
}