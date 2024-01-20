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
                window.location.assign("main.html");
            }).catch(function (error) {
                console.log("Error submitting questionnaire: " + error);
            })
        }})

}