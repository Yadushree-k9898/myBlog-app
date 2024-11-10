import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_0CVtu80Q5NVH_23csAABpZEPEqj6IxA",
  authDomain: "myblog-d2fe0.firebaseapp.com",
  projectId: "myblog-d2fe0",
  storageBucket: "myblog-d2fe0.firebasestorage.app", // This line is still required for Firestore, no need to remove
  messagingSenderId: "1076517215154",
  appId: "1:1076517215154:web:d52b67b51e9ac2722e62ab",
};

const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);

export { fireDb, auth };
