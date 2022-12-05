import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

function initFirebaseAuth(authStateObserver) {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

export {
  signIn, 
  signOutUser, 
  initFirebaseAuth
}
