import * as firebase from "firebase";
import firebaseApp from './firebaseCodes';
var myData = {};
var allDeals = [];
var goodDeals = [];
var badDeals = [];
var savedDeals = [];
var dealsMade = [];



// pull my data
const _getMyData = (userID) => {
    return firebase.database().ref().child(`users/${userID}`).once('value').then(snapshot => {        
        myData = {
            uid: snapshot.val().uid,
            email: snapshot.val().email,
            name: snapshot.val().name
        };


        return myData;
    });
};


// get my saved deals
const _getSavedDeals = (userID) => {
    return firebase.database().ref().child(`users/${userID}/savedDeals`).once('value').then(snapshot => {
        snapshot.forEach((child) => {
            savedDeals.push({
                key: child.key,
                author: child.val().author,
                content: child.val().content,
                goodBad: child.val().goodBad,
                link: child.val().link,
                title: child.val().title,
                timestamp: child.val().timestamp,
                uid: child.val().uid
            });
        });


        return savedDeals;
    });
}


// get deals i made
const _getDealsMade = (userID) => {
    return firebase.database().ref().child(`users/${userID}/myDeals`).once('value').then(snapshot => {
        snapshot.forEach((child) => {
            dealsMade.push({
                key: child.key,
                author: child.val().author,
                content: child.val().content,
                goodBad: child.val().goodBad,
                link: child.val().link,
                title: child.val().title,
                timestamp: child.val().timestamp,
                uid: child.val().uid
            });
        });


        return dealsMade;
    });
}


// get all deals
const _getDeals = () => {
    return firebase.database().ref().child(`allDeals/`).once('value').then(snapshot => {
        snapshot.forEach((child) => {
            if (child.val().goodBad == true) {
                allDeals.push({
                    goodBad: true,
                    key: child.key,
                    author: child.val().author,
                    content: child.val().content,
                    link: child.val().link,
                    title: child.val().title,
                    timestamp: child.val().timestamp,
                    uid: child.val().uid
                });
                goodDeals.push({
                    goodBad: true,
                    key: child.key,
                    author: child.val().author,
                    content: child.val().content,
                    link: child.val().link,
                    title: child.val().title,
                    timestamp: child.val().timestamp,
                    uid: child.val().uid
                });
            }
            else {
                allDeals.push({
                    goodBad: false,
                    key: child.key,
                    author: child.val().author,
                    content: child.val().content,
                    link: child.val().link,
                    title: child.val().title,
                    timestamp: child.val().timestamp,
                    uid: child.val().uid
                });
                badDeals.push({
                    goodBad: false,
                    key: child.key,
                    author: child.val().author,
                    content: child.val().content,
                    link: child.val().link,
                    title: child.val().title,
                    timestamp: child.val().timestamp,
                    uid: child.val().uid
                });
            }
        });


        return allDeals;
    });
};


// get bad deals
const _getBad = () => {
    return badDeals;
}


// get good deals
const _getGood = () => {
    return goodDeals;
}


// export
export {_getMyData, _getSavedDeals, _getDealsMade, _getDeals, _getBad, _getGood};