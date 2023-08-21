import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Get values from enviormental variables
const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIRBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID,
} = import.meta.env;

// Firebase configuration
const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VITE_FIRBASE_MESSAGING_SENDER_ID,
	appId: VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
