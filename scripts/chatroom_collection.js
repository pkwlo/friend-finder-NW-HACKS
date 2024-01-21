console.log('db_product_search.js loaded');
sort_method = undefined

async function displayCardsDynamically(collection) {
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            let cardTemplate = document.getElementById("chat_card_template");
            var chats = document.getElementById('chat-go-here');
            chats.innerHTML = ''; // Clear once before adding new content

            await db.collection('chatrooms').get().then(async allProducts => {
                allProducts.forEach(async doc => {
                    if (doc.data().users.includes(user.uid)) {
                        console.log(user.uid)
                        nameID = user.uid

                        doc.data().users.forEach(async user => {
                            if (nameID != user) {

                                let showName;
                                let newcard = cardTemplate.content.cloneNode(true);
                                console.log('test     ' + user)

                                await db.collection('users').where(firebase.firestore.FieldPath.documentId(), '==', user).get().then(
                                    async results => {
                                        results.forEach(doc => {
                                            
                                            showName = doc.data().name;
                                            console.log(showName)
                                            newcard.querySelector('.card-title').innerHTML = showName;
                                        })
                                    }
                                )
                                
                                await db.collection('chatrooms').doc(doc.id).collection('message_history').orderBy('time', 'desc').limit(1).get().then(
                                    message => {
                                        console.log(message.docs[0].data().message)
                                        newcard.querySelector('.card-length').innerHTML = message.docs[0].data().message;
                                    })
                                

                                newcard.querySelector('.card-href').addEventListener('click', () => {
                                    window.location.href = "chatroom.html?chatroomid=" + doc.id;
                                });

                                chats.appendChild(newcard);
                            }


                        })
                    }
                });
            }).catch(error => {
                console.error("Error fetching chatrooms: ", error);
            });
        } else {
            console.log('User is not logged in');
        }
    });
}

displayCardsDynamically();

