import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrVirx6F1lfUGSYfZxQWvuVSQWBodqhRk",
  authDomain: "practice-bf840.firebaseapp.com",
  projectId: "practice-bf840",
  storageBucket: "practice-bf840.appspot.com",
  messagingSenderId: "329551465127",
  appId: "1:329551465127:web:de31241f95ccc9a1662982",
  measurementId: "G-9CL6031K0E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  getDoc,
  getDocs,
  collection,
  addDoc,
  onAuthStateChanged,
  signOut,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  query,
  where,
  updateDoc,
};
