import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { FIREBASE_API_KEY } from "@env";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'backend-catat-uang.firebaseapp.com',
  databaseURL: 'https://backend-catat-uang.firebaseio.com',
  projectId: 'backend-catat-uang',
  storageBucket: 'backend-catat-uang.firebasestorage.app',
  messagingSenderId: '504515461272',
  appId: 'backend-catat-uang',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export default app;
export { auth };