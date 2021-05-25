function getStarted() {
    user_name = document.getElementById("user_name").value;
    room_name = document.getElementById("room_name").value;

    if (user_name, room_name == "") {
        document.getElementById("er1").innerHTML = "<i class='fa fa-warning'></i> Invalid name";
        document.getElementById("er2").innerHTML = "<i class='fa fa-warning'></i>Invalid room name";
    } else {
        document.getElementById("hideElement").style.display = "block";
        localStorage.setItem("username", user_name);
        localStorage.setItem("roomname", room_name);
        window.location = "/user_screen/user.html";
    }
}