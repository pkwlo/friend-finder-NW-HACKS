
console.log('db_product_search.js loaded');
sort_method = undefined

// currentUser = db.collection("users").doc(user.uid)
function displayCardsDynamically(collection) {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid)

        // get html template from specific ID, store it 
        // let cardTemplate = document.getElementById("chat_card_template");
        var chats = document.getElementById('chat-go-here');

        console.log('test2')
        // retrieve all documents from firebase collection
        db.collection('chatrooms').get().then(allProducts => {
            console.log('test3')
            // iterate through each item in document
            allProducts.forEach(doc => {
                console.log(doc.data().users)
                // if document matches search item
                if (doc.data().users.includes(user.uid)) {

                    // clear out initial HTML div so we can add new HTML template
                    let receiverid = doc.data().users.filter(id => id != user.uid)
                    console.log(receiverid)
                    let chatCardName = document.createElement("div");
                    db.collection('users').doc(receiverid[0]).get().then(receiver => {
                        chatCardName.innerHTML = receiver.data().name;
                    })

                    let clickCard = document.createElement("a");
                    clickCard.href = "chatroom.html?chatroomid=" + doc.id;
                    let chatCard = document.createElement("div");
                    chatCard.id = doc.id;
                    chatCard.className = "chat-card"
                    chatCard.style.display = "block";
                    chatCard.appendChild(chatCardName);
                    clickCard.appendChild(chatCard);

                    chats.appendChild(clickCard);

                    console.log('success')
                }
            })
        })
    })
}
displayCardsDynamically()
