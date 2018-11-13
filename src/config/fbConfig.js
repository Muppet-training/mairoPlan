// import firebase/app which is the core functionality of firebase
import firebase from 'firebase/app';
// import firestore which is our database
import 'firebase/firestore';
// import auth which will allow us to have authentication in the app
import 'firebase/auth';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyABpVjiU_PU9Qa-Tzb6wO03ZYgHGN2cIGM',
	authDomain: 'marioplan-b21a4.firebaseapp.com',
	databaseURL: 'https://marioplan-b21a4.firebaseio.com',
	projectId: 'marioplan-b21a4',
	storageBucket: 'marioplan-b21a4.appspot.com',
	messagingSenderId: '593355610144'
};

firebase.initializeApp(config);
// This is a recent update to firebase with regards to how it stores the data
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
