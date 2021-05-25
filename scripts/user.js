var firebaseConfig = {
    apiKey: "AIzaSyAPisP71a7zIlHL2hmb7jjjJwoMStruNEU",
    authDomain: "searcherlook-database.firebaseapp.com",
    databaseURL: "https://searcherlook-database-default-rtdb.firebaseio.com",
    projectId: "searcherlook-database",
    storageBucket: "searcherlook-database.appspot.com",
    messagingSenderId: "474313871406",
    appId: "1:474313871406:web:aeae629dc67d9acbd6cfbf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
chat_room = localStorage.getItem("roomname");
room_name = "mssages-chats";

document.getElementById("user_name").innerHTML = user_name + "<img src='/images/verified.png' title='Verified' class='user_tick'/>";
document.getElementById("given_name").innerHTML = '@' + user_name.toLowerCase().concat() + '_';
document.getElementById("name").innerHTML = user_name;
document.getElementById("room_name").innerHTML = chat_room;

function send() {
    msg = document.getElementById("msg").value;
    if (msg == "") {
        document.getElementById("msg").placeholder = "Please enter a message otherwise will not send..."
    } else {
        document.getElementById("msg").placeholder = "Write your message here..."
        firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
        });

        document.getElementById("msg").value = "";
    };
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                row = "<h4 title='" + name_verified + "'><img class='user_profile' src='https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7--v2.png'> " + name + " <img src='/images/verified.png' title='Verified' class='user_tick'/></h4><h4 type='text' class='message_h4'> " + message + "</h4><button class='btn btn-default heart' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='fa fa-heart'> " + like + "</span></button><hr>";
                document.getElementById("output").innerHTML += row;
            };
        });
    });
}

name_verified = user_name;

getData();

function updateLike(message_id) {
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    likes_in_number = Number(likes) + 1;
    console.log(likes_in_number);

    firebase.database().ref(room_name).child(message_id).update({
        like: likes_in_number
    });

}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location.replace("../index.html");
}



function profile() {
    window.location = "profile.html";
}

function chatRoom() {
    window.location = "chat-room.html";
}

function createChat() {
    window.location = "create.html";
}

function videoChat() {
    window.location = "videoChat.html";
}

function about() {
    window.location = "about.html";
}