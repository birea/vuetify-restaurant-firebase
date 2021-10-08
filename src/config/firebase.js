import firebase from 'firebase'

// Initialize Firebase
var config = {
	apiKey: "YOUR-API",
	authDomain: "restaurant-901d0.firebaseapp.com",
	databaseURL: "https://restaurant-901d0.firebaseio.com",
	projectId: "restaurant-901d0",
	storageBucket: "restaurant-901d0.appspot.com",
	messagingSenderId: "335039259620"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const auth = firebase.auth();
export const storage = firebase.storage().ref();


