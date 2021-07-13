//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBenRb4eo-Ac1R0cEAYFGa_m-4nbxrqa-I",
    authDomain: "kwitter-74276.firebaseapp.com",
    databaseURL: "https://kwitter-74276-default-rtdb.firebaseio.com",
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

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                row = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'" +
                    message + "</h4><button class='btn btn-warning' id='" + firebase_message_id +
                    "'value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'> Like: " +
                    like + "</span></button><hr>";
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}