$(document).ready(function () {
    checkQuestionnaire();
});

var user_tags = [];

async function checkQuestionnaire() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            await db.collection("questionnaire").where("user_id", "==", user.uid).get().then(
                results => {
                    results.forEach(result => {
                        user_tags.push(result.data().interests);
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
            console.log(user_tags);
        }
    })
    
}