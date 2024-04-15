// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore/lite";
import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA82dgMv-JYrTLwXOE6wz-KutS7yVqlVf8",
  authDomain: "silverithm-9f08c.firebaseapp.com",
  projectId: "silverithm-9f08c",
  storageBucket: "silverithm-9f08c.appspot.com",
  messagingSenderId: "503354392174",
  appId: "1:503354392174:web:6e29998bac00f1e7a8707f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getReservations() {
  const query = await getDocs(collection(db, "reservations"));

  const data: { id: string; reservations: any }[] = [];
  query.forEach((doc) => {
    console.log(doc.id, doc.data()["datas"]);
    data.push({ id: doc.id, reservations: doc.data()["datas"] });
  });

  console.log(data);
  return data;
}

export async function getElders() {
  const query = await getDocs(collection(db, "elders"));

  const data: { id: string; name: any }[] = [];
  query.forEach((doc) => {
    console.log(doc.id, doc.data()["name"]);
    data.push({ id: doc.id, name: doc.data()["name"] });
  });

  console.log(data);
  return data;
}

export async function addElder(name: string) {
  await addDoc(collection(db, "elders"), {
    name: name,
  });
}

export async function addMachine() {
  await addDoc(collection(db, "reservations"), {
    datas: [],
  });
}

export async function addReservationElder(
  id: string,
  name: string,
  currentReservations: any
) {
  console.log(id);
  console.log(currentReservations);
  console.log(name);

  currentReservations.push(name);

  await updateDoc(doc(db, "reservations", id), {
    datas: currentReservations,
  });
}
export async function updateReservationElder(
  id: string,
  name: string,
  reservationIdx: number,
  currentReservations: any
) {
  console.log(id);
  console.log(currentReservations);
  console.log(name);
  currentReservations[reservationIdx] = name;

  await updateDoc(doc(db, "reservations", id), {
    datas: currentReservations,
  });
}
