console.log('db_product_search.js loaded');
sort_method = undefined

function displayCardsDynamically(collection) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let cardTemplate = document.getElementById("chat_card_template");
            var chats = document.getElementById('chat-go-here');
            chats.innerHTML = ''; // Clear once before adding new content

            db.collection('chatrooms').get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.data().users.includes(user.uid)) {
                        console.log(user.uid)
                        nameID = user.uid

                        doc.data().users.forEach(user => {
                            if (nameID != user) {

                                let showName;
                                let newcard = cardTemplate.content.cloneNode(true);
                                console.log('test     ' + user)

                                // db.collection('users').doc(user).get().then(doc => {
                                //     if (doc.exists) {
                                //         let userName = doc.data().name; // Access the name field
                                //         console.log(userName); // This will log "bob" to the console
                                //     } else {
                                //         console.log("Document does not exist");
                                //     }
                                // }).catch(error => {
                                //     console.error("Error getting document:", error);
                                // });
                                // db.collection('users').doc(user).get().then(doc => {
                                //     console.log("User name:", doc.data().name);
                                //     showName = doc.data().name;

                                // })
                                newcard.querySelector('.card-title').innerHTML = user;
                                // newcard.querySelector('.card-title').innerHTML = `${db.collection("users").doc(user).data().name}`; // Replace with actual data
                                newcard.querySelector('.card-length').innerHTML = "I CRY"; // Replace with actual data

                                newcard.querySelector('.card-href').addEventListener('click', () => {
                                    add_to_list_from_search(doc.ref.path, false);
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

