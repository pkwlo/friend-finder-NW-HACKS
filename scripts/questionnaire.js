$(document).ready(function () {
    populateInterests();
});

function populateInterests() {
    var interests = ['Photography', 'Travel', 'Sports', 'Painting', 'Dancing', 'Music', 'Video games', 'Reading', 'Cooking', 'Hiking', 'Writing']

    for (var i = 0; i < interests.length; i++) {
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'btn-check';
        input.autocomplete = 'off';
        input.id = interests[i];
        var label = document.createElement('label');
        label.className = 'btn btn-outline-primary';
        label.innerHTML = interests[i];
        label.htmlFor = interests[i];
        document.getElementById('interest-question').appendChild(input);
        document.getElementById('interest-question').appendChild(label);
    };


}

function submitQuestionnaire() {
    console.log('here')
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var interests = ['Photography', 'Travel', 'Sports', 'Painting', 'Dancing', 'Music', 'Video games', 'Reading', 'Cooking', 'Hiking', 'Writing']
            var selectedInterests = [];
            for (var i = 0; i < interests.length; i++) {
                if (document.getElementById(interests[i]).checked) {
                    selectedInterests.push(interests[i]);
                }
            }
            var hangout = document.getElementById('hangout').checked
            var chat = document.getElementById('chat').checked
            if (document.getElementById('yes-outdoor').checked) {
                var outdoor = true;
            } else {
                var outdoor = false;
            }
            var location = document.getElementById('location').value;

            db.collection("questionnaire").add({
                user_id: user.uid,
                interests: selectedInterests,
                hangout: hangout,
                chat: chat,
                outdoor: outdoor,
                location: location
            }).then(function () {
                console.log("Questionnaire submitted");
                matchUsers();
                window.location.assign("main.html");
            }).catch(function (error) {
                console.log("Error submitting questionnaire: " + error);
            })
        }
    })

}

//Loop through all users and compare tags and give each user a score according to how many tags they have in common with the current user
// function matchUsers() {
//     var user_tags = [];
//     var user_interests = [];

//     firebase.auth().onAuthStateChanged(async function (user) {
//         if (user) {
//             await db.collection("questionnaire").where("user_id", "==", user.uid).get().then(
//                 results => {
//                     results.forEach(result => {
//                         user_interests.push(result.data().interests);
//                         user_tags.push(result.data().hangout);
//                         user_tags.push(result.data().chat);
//                         user_tags.push(result.data().outdoor);
//                         user_tags.push(result.data().location);
//                     })
//                 }
//             )
//         }
//     }
//     )

//     db.collection("questionnaire").get().then(
//         allUsers => {
//             allUsers.forEach(user => {
//                 var score = 0;

//                 var next_user_tags = [];
//                 var next_user_interests = [];
//                 var other_user_id = user.data().user_id;
//                 var current_user_id = firebase.auth().currentUser.uid;

//                 if (user.data().user_id != firebase.auth().currentUser.uid) {
//                     next_user_interests.push(user.data().interests);
//                     next_user_tags.push(user.data().hangout);
//                     next_user_tags.push(user.data().chat);
//                     next_user_tags.push(user.data().outdoor);
//                     next_user_tags.push(user.data().location);

//                     for (var i = 0; i < user_tags.length; i++) {
//                         if (user_tags[i] == next_user_tags[i]) {
//                             score++;
//                         }
//                     }

//                     for (var i = 0; i < user_interests[0].length; i++) {
//                         if (next_user_interests[0].includes(user_interests[0][i])) {
//                             score++;
//                         }
//                     }
//                     console.log(score);

//                     //add the score to the user's document in the database
//                     db.collection("users").doc(current_user_id).collection("other_users").add(
//                         {
//                             name: other_user_id,
//                             score: score
//                         })
//                 }
//             })
//         })
// }