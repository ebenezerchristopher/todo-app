import { getAuth } from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

async function addUser(user) {
  let id = `${user.uid}`;
  let data = {
    name: user.displayName,
  };
  let db = getFirestore();
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this cas
    try {
      await setDoc(docRef, data);
    } catch (e) {
      console.log("Error creating user");
    }
  }
}

async function userExists(user) {
  let id = `${user.uid}`;

  let db = getFirestore();
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    // doc.data() will be undefined in this cas
    return false;
  }
}

export { addUser, userExists};
