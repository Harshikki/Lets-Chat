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

    user_name = localStorage.getItem("user_name"); 
    room_name = localStorage.getItem("room_name");

function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val();

      if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;

name = message_data['name']; 
message = message_data['message']; 
like = message_data['like']; name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>"; 
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"; 
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"; 
row = name_with_tag + message_with_tag +like_button + span_with_tag; document.getElementById("output").innerHTML += row;


      } });  }); }      
getData();

function send() {
      msg = document.getElementById("mesg").value; 
      firebase.database().ref(room_name).push({ name:user_name, message:msg, like:0 }); 
      document.getElementById("mesg").value = "";
}

function updateLike(message_id) {
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes) + 1;
firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes
});
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "chat.html";
}
