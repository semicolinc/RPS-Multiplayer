$(document).ready(function() {
    function main(){
        var config = {
            apiKey: "AIzaSyCc9aVts_kSd9GVCcaYwQanLNQp4PBZX2s",
            authDomain: "rps-multiplayer-a05f5.firebaseapp.com",
            databaseURL: "https://rps-multiplayer-a05f5.firebaseio.com",
            projectId: "rps-multiplayer-a05f5",
            storageBucket: "rps-multiplayer-a05f5.appspot.com",
            messagingSenderId: "218401664369",
            appId: "1:218401664369:web:0189b51659d3a0f2fd1ad0",
            measurementId: "G-JSJG3T8VV1"
        };
        // Initialize Firebase
        firebase.initializeApp(config);

        // Initialize variables
        var database = firebase.database();
        var ref = database.ref('players');
        var userKey = null;
        var userRef = firebase.database().ref('/players/'+userKey);

        // Code puts user unique ID into green waiting room when Enter is pressed

        $("#enter").on('click', function(){
            if (userKey == null){
                let player = {
                    status: "waiting"
                }
                ref.push(player);
            };
            database.ref().child('players').on("child_added", function(snapshot) {
                let key = snapshot.key;
                localStorage.setItem("key", key);
                userKey = localStorage.getItem("key");
                userRef = firebase.database().ref('/players/'+userKey); 
            });
        });

        database.ref().child('players').on("child_added", function(snapshot) {
            let key = snapshot.key;
            let p = $("<div><div>").text(key);
            console.log(key);
            $("#userbox").append(p);
        });

        //This function destroys localstorage and database storage to remove user from waiting list
        
        $("#leave").on('click', function(){
            userRef.remove();
            localStorage.clear();
            alert("Reload the page to fully process your absence.");
        });

        //When at least two users are in the waiting room at the same time, they are put into a game of rock paper scissors.
    };
    main();
});