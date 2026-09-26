import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "Your-API-Key",
  authDomain: "jagadeeeee-1112005.firebaseapp.com",
  projectId: "jagadeeeee-1112005",
  storageBucket: "jagadeeeee-1112005.firebasestorage.app",
  messagingSenderId: "225708615189",
  appId: "1:225708615189:web:47a9b2ee9314b417a3101c",
  measurementId: "G-M67PJNZ31K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };