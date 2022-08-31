import { initializeApp } from "firebase/app"
import 'firebase/compat/auth'
import { getFirestore, collection, query, where, getDocs, addDoc, setDoc, doc, getDoc, deleteDoc, orderBy, limit, updateDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAf54rrTiRGHWQuhFP11SmcEa5C2-5mWYI",
    authDomain: "appuesta.firebaseapp.com",
    projectId: "appuesta",
    storageBucket: "appuesta.appspot.com",
    messagingSenderId: "645250217104",
    appId: "1:645250217104:web:c4954dc4285a15b7ff1415",
    measurementId: "G-WWWK6CX86R"
});

export const collectionf = collection;
export const queryf = query;
export const wheref = where;
export const getDocsf = getDocs;
export const addDocf = addDoc;
export const setDocf = setDoc;
export const docf = doc;
export const getDocf = getDoc;
export const deleteDocf = deleteDoc;
export const orderByf = orderBy;
export const limitf = limit;
export const updateDocf = updateDoc;
export const db = getFirestore(firebaseApp);

export default firebaseApp;