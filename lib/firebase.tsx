import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-ZXOsujrh7q8IPVAfBIXD32zZBmCPRgc",
    authDomain: "task-manager-v2-df332.firebaseapp.com",
    projectId: "task-manager-v2-df332",
    storageBucket: "task-manager-v2-df332.firebasestorage.app",
    messagingSenderId: "717330619556",
    appId: "1:717330619556:web:110b0af09996e31026da31"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;