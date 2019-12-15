import * as firebase from "firebase";
import firebaseConfig from "../../firebaseConfig";

export const initialise = () => {
  firebase.initializeApp(firebaseConfig);
};

export const saveItem = (ref, set) => {
  const database = firebase.database();
  return database
    .ref(ref)
    .push()
    .set(set);
};

export const readItemOnce = ref => {
  const database = firebase.database();
  return database
    .ref(ref)
    .orderByChild("elapsedTime")
    .once("value");
};
