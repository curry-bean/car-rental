let app_firebase = {};
(function() {
    let firebaseConfig = {
        apiKey: "AIzaSyC09XsYkVR4IvK7DOZXJ5VHPK9tmToI9uY",
        authDomain: "limelight-bc6e1.firebaseapp.com",
        databaseURL: "https://limelight-bc6e1-default-rtdb.firebaseio.com",
        projectId: "limelight-bc6e1",
        storageBucket: "limelight-bc6e1.appspot.com",
        messagingSenderId: "69038279585",
        appId: "1:69038279585:web:eaa5482ffb76283ca419e0",
        measurementId: "G-22JZ9BLN9C"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    let perf = firebase.performance();

    app_firebase = firebase;
})()