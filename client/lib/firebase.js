// 🌟 FINANCIAL EMPIRE: FIREBASE FALLBACK
// This is a fallback implementation for when Firebase is not available

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase config is available
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "your_api_key_here"
);

// Fallback implementations
export const db = null;
export const auth = null;
export const isFirebaseEnabled = false;

console.log(
  isFirebaseConfigured
    ? "Firebase config found but packages not installed. Install firebase for full functionality."
    : "Firebase not configured. Using local storage fallback for demo.",
);
