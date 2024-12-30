import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc , doc, setDoc, getDoc,getDocs,serverTimestamp,updateDoc,deleteDoc } from 'firebase/firestore';
import { getAuth , onAuthStateChanged , signOut ,createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';

// تهيئة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmWd1lLNe5ejXsjMUNv1LccIttRDQMG2U",
  authDomain: "test-14ad0.firebaseapp.com",
  databaseURL: "https://test-14ad0-default-rtdb.firebaseio.com",
  projectId: "test-14ad0",
  storageBucket: "test-14ad0.appspot.com",
  messagingSenderId: "132581581918",
  appId: "1:132581581918:web:143b5a758c09914ecd40cf",
  measurementId: "G-Q6F2R56XH6"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
// الحصول على مرجع Firestore
const db = getFirestore(app);
const auth = getAuth(app);

// تصدير الدوال المستخدمة
export {app, db, getFirestore, collection, addDoc , doc, setDoc, getDoc,getDocs,serverTimestamp,updateDoc,deleteDoc ,auth , getAuth , onAuthStateChanged , signOut , createUserWithEmailAndPassword , signInWithEmailAndPassword };
