let username

$(document).ready(async function () {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            await db.collection("users").doc(user.uid).get().then(
                results => {
                    username = results.data().name;

                }
            )
        }
    })
    loadMessages();
});

async function loadMessages() {
    var messages = document.getElementById("chats-go-here");
    await db.collection("chatrooms").doc('0B6f234PRY9UrdadngOZ').collection("message_history").onSnapshot(
        chats => {
            console.log('here')
            chats.docChanges().forEach(chat => {
                if (chat.type == "added") {
                    var message_card = document.createElement("div");
                    message_card.classList.add("message_card");

                    var message = document.createElement("div");
                    message.classList.add("message");

                    message.innerHTML = chat.doc.data().message;
                    var time = document.createElement("div");
                    time.classList.add("time");

                    // fix this
                    time.innerHTML = chat.doc.data().time.toDate();

                    var displayname = document.createElement("div");
                    displayname.classList.add("name");

                    displayname.innerHTML = chat.doc.data().username;
                    message_card.appendChild(displayname);
                    message_card.appendChild(message);
                    message_card.appendChild(time);
                    messages.appendChild(message_card);
        }})
        
})
}

function sendMessage() {
    var message = document.getElementById("chat-input").value;

    // db.collection("chatrooms").doc('0B6f234PRY9UrdadngOZ').update({
    //     message_history: firebase.firestore.FieldValue.arrayUnion({
    //         message: message,
    //     })
    // })

    db.collection("chatrooms").doc('0B6f234PRY9UrdadngOZ').collection("message_history").add({
        message: message,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
        username: username
    })
}