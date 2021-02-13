const firebaseConfig = {
  apiKey: "AIzaSyBmO6IcT3DmXE1QQ90knDBFGgNHi3dAM_0",
  authDomain: "letschat-40177.firebaseapp.com",
  databaseURL: "https://letschat-40177-default-rtdb.firebaseio.com",
  projectId: "letschat-40177",
  storageBucket: "letschat-40177.appspot.com",
  messagingSenderId: "377434993849",
  appId: "1:377434993849:web:b7236a73fdd2f868fdd768"
};

firebase.initializeApp(firebaseConfig);

  function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
    purpose: "adding the room"
    });
    localStorage.setItem("room_name",room_name);
    window.location = "chat_page.html";
  }

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) 
    {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
    childKey  = childSnapshot.key;
    Room_names = childKey;
    row = "<div class = 'room_name' id = "+Room_names+" onclick = 'redirectToRoomName(this.id)'> #"+Room_names+"</div><hr>";
    document.getElementById("output").innerHTML += row;
    });});}
getData();

function redirectToRoomName(name) {
    localStorage.setItem("room_name",name);
    window.location = "chat_page.html";
}

function logout() {
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location = "chat.html";
}