
console.log('db_product_search.js loaded');
sort_method = undefined

// currentUser = db.collection("users").doc(user.uid)
function displayCardsDynamically(collection) {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid)

        // get html template from specific ID, store it 
        let cardTemplate = document.getElementById("chat_card_template");

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
                    document.getElementById('chat-go-here').innerHTML = 'test'

                    // CREATE NEW DIVS FOR INJECTION + REDIRECT LINKS
                    // CREATE NEW DIVS FOR INJECTION + REDIRECT LINKS
                    // CREATE NEW DIVS FOR INJECTION + REDIRECT LINKS
                    // CREATE NEW DIVS FOR INJECTION + REDIRECT LINKS

                    console.log('success')
                }
            })
        })
    })
}
displayCardsDynamically()
