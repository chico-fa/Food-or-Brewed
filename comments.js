  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-fUNZAHs-oPkAKOHiJjRg8W-iXZKPkkw",
    authDomain: "testproject7-43dd4.firebaseapp.com",
    databaseURL: "https://testproject7-43dd4.firebaseio.com",
    projectId: "testproject7-43dd4",
    storageBucket: "testproject7-43dd4.appspot.com",
    messagingSenderId: "328844792261"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Capture Button Click 
  $("#submit-button").on("click", function (event) {
      event.preventDefault();

      var name = $("#name").val().trim();
      var comment = $("#comment").val().trim();

      var newComment = {
          name: name,
          comment: comment
      }

      database.ref().push(newComment)
        console.log(newComment.name);
        console.log(newComment.comment);

        alert("Thanks for your feedback!")
      });
  

  database.ref().on("child_added", function (snapshot) {
      console.log(snapshot)
          var sn = snapshot.val().name;
          var sv = snapshot.val().comment;
          console.log(sn);
          console.log(sv);

          //$("#name-display").text(snapshot.val().name);
          //$("#email-display").text(snapshot.val().email);
      },

      function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
      }
  );