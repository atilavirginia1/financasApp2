import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyApmHyXgWhpX73lm8XpwshK3W9Ar3qWT0w",
    authDomain: "fir-app-dd11b.firebaseapp.com",
    databaseURL: "https://fir-app-dd11b-default-rtdb.firebaseio.com",
    projectId: "fir-app-dd11b",
    storageBucket: "fir-app-dd11b.appspot.com",
    messagingSenderId: "1051210899138",
    appId: "1:1051210899138:web:cc497d7244b07ea094e55b"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }
  
export default firebase;