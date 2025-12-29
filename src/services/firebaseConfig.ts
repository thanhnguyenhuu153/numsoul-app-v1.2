import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Vite uses import.meta.env to access environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth: firebase.auth.Auth | null = null;
let googleProvider: firebase.auth.GoogleAuthProvider | null = null;

try {
  // Check if API Key exists to avoid crashing in environments without config
  if (firebaseConfig.apiKey) {
    // Prevent duplicate initialization
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.app();
    }
    auth = firebase.auth();
    googleProvider = new firebase.auth.GoogleAuthProvider();
    
    // Optional: Configure Google Provider specific scopes if needed
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
  } else {
    console.warn("Firebase config is missing (VITE_FIREBASE_API_KEY). Auth will not work.");
  }
} catch (e) {
  console.error("Firebase Initialization Error:", e);
}

export { auth, googleProvider };