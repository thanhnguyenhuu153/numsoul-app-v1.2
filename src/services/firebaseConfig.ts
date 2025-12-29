// Firebase configuration is temporarily disabled to prevent build errors related to missing modules.
// To enable Firebase: ensure 'firebase' package is installed (v9+) and uncomment the code below.

/*
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

let app;
let auth: any = null;
let googleProvider: any = null;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn("Firebase config is missing. Auth will not work.");
  }
} catch (e) {
  console.error("Firebase Initialization Error:", e);
}

export { auth, googleProvider };
*/

export const auth = null;
export const googleProvider = null;
