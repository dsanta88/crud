import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAiJHWpUTK4z1Vcs3JZunRoRlYb1oellm4",
    authDomain: "crud-4132c.firebaseapp.com",
    projectId: "crud-4132c",
    storageBucket: "crud-4132c.appspot.com",
    messagingSenderId: "843767257847",
    appId: "1:843767257847:web:a7c5b4abeb67e9c194d1f2"
  };



  export const firebaseApp=firebase.initializeApp(firebaseConfig)


  