import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
	apiKey: 'AIzaSyCtFrJNV3JKVME9urUPl6B_tLuL62lRUjs',
    authDomain: 'pokeapi-1984d.firebaseapp.com',
    databaseURL: 'https://pokeapi-1984d.firebaseio.com',
    projectId: 'pokeapi-1984d',
    storageBucket: 'pokeapi-1984d.appspot.com',
    messagingSenderId: '536958200325',
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings(settings);

export default firebase;