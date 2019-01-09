import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCOIdAJkRhqKfZkp-RbfBFqapC2tKFt2tc",
    authDomain: "rip-offs.firebaseapp.com",
    databaseURL: "https://rip-offs.firebaseio.com",
    projectId: "rip-offs",
    storageBucket: "rip-offs.appspot.com",
    messagingSenderId: "1059606578870"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);