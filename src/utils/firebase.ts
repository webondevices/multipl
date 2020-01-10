import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';

export const initialise = () => {
  firebase.initializeApp(firebaseConfig);
  firebase
    .auth()
    .signInAnonymously()
    .catch(console.error);
};

export const saveItem = (ref, set) => {
  const database = firebase.database();
  const user = firebase.auth().currentUser;
  if (user) {
    return database
      .ref(ref)
      .push()
      .set(set);
  }
  return Promise.reject(new Error('Unable to save item.'));
};

export const readItemOnce = ref => {
  const database = firebase.database();
  return database
    .ref(ref)
    .orderByChild('elapsedTime')
    .once('value');
};
