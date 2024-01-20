$(document).ready(function () {
    checkQuestionnaire();
});

function checkQuestionnaire() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("questionnaire").where("user_id", "==", user.uid).get().then(function (querySnapshot) {
                if (querySnapshot.size <= 0) {
                    
                    window.location.assign("questionnaire.html");
                }
            })
        }
    })
}