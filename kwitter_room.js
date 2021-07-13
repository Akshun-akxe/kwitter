//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBenRb4eo-Ac1R0cEAYFGa_m-4nbxrqa-I",
    authDomain: "kwitter-74276.firebaseapp.com",
    projectId: "kwitter-74276",
    storageBucket: "kwitter-74276.appspot.com",
    messagingSenderId: "424685548477",
    appId: "1:424685548477:web:95da1fda67d5c9bc8e18d4",
    measurementId: "G-N5ZB0CL2LG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room Names - ", Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);

    window.location("kwitter_page.html");
}

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.reoveItem("user_name");
    localStorage.removeItem("roome_name");
    window.location = "index.html"
}