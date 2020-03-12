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
        var userKey = localStorage.getItem("key");
        var userRef = firebase.database().ref('/players/'+userKey);
        const playerList = firebase.database().ref().child('players');

        $("#enter").on('click', function(){
            if (userKey == null){
                let player = {
                    status: "waiting"
                }
                ref.push(player);
            };
        });

        playerList.on("child_added", snap => {
            let key = snap.key;
            localStorage.setItem("key", key);
            let p = $("<div><div>").text(key);
            console.log(key);
            $("#userbox").append(p);
            userKey = localStorage.getItem("key");
        });
        
        $("#leave").on('click', function(){
            userRef.remove();
            localStorage.clear();
            alert("Reload the page to fully process your absence.");
        });
    };
    main();
});