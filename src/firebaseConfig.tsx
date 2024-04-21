// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  deleteDoc,
  getFirestore,
  updateDoc,
  query,
  orderBy,
  doc,
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
  const querys = await getDocs(
    query(collection(db, "reservations"), orderBy("timestamp", "asc"))
  );

  const data: { id: string; reservations: any }[] = [];
  console.log(querys);
  querys.docs.forEach((doc) => {
    console.log(doc.id, doc.data()["datas"]);
    data.push({ id: doc.id, reservations: doc.data()["datas"] });
  });

  console.log(data);
  data.sort();
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
  const date = new Date();
  await addDoc(collection(db, "reservations"), {
    datas: [],
    timestamp: date.getTime(),
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

export async function deleteFirstReservationElder(
  id: string,
  currentReservations: any
) {
  console.log(id);
  console.log(currentReservations);

  currentReservations.shift();

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

export async function deleteReservationElder(
  id: string,
  name: string,
  reservationIdx: number,
  currentReservations: any
) {
  console.log(id);
  console.log(currentReservations);
  console.log(name);

  currentReservations.splice(reservationIdx, 1);

  await updateDoc(doc(db, "reservations", id), {
    datas: currentReservations,
  });
}

export async function deleteElder(elderId: string) {
  console.log(elderId);

  await deleteDoc(doc(db, "elders", elderId));
}

export async function deleteMachine(id: string) {
  await deleteDoc(doc(db, "reservations", id));
}
