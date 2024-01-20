//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbar-here').load('./templates/nav_after_login.html'));
            console.log($('#footer-here').load('./templates/footer_after_login.html'));
        } else {
            // No user is signed in.
            console.log($('#navbar-here').load('./templates/nav_before_login.html'));
            console.log($('#footer-here').load('./templates/footer_before_login.html'));
        }
    });
}
loadSkeleton(); //invoke the function