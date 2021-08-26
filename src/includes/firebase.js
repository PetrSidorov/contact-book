import firebase from 'firebase/app';
// import FieldValue from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfT107YkVF1aGEBcgLQLaL8cJ_MLi5c2k',
  authDomain: 'contacts-64f5c.firebaseapp.com',
  projectId: 'contacts-64f5c',
  storageBucket: 'contacts-64f5c.appspot.com',
  messagingSenderId: '889906026529',
  appId: '1:889906026529:web:41629a6c2f799c7fde2b60',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const contactsCollection = db.collection('contacts');
const contactsCollectionD = db.collection('contactsBook');

export {
  contactsCollection,
  contactsCollectionD,
};
