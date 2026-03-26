import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  updateDoc,
} from "firebase/firestore";

export async function getItems(userId) {
  const items = collection(db, "users", userId, "items");
  const q = query(items);
  const querySnapshot = await getDocs(q);
  const itemsList = [];
  querySnapshot.forEach((doc) => {
    itemsList.push({ id: doc.id, ...doc.data() });
  });
  return itemsList;
}

export async function addItem(userId, item) {
  const items = collection(db, "users", userId, "items");
  const addedDoc = await addDoc(items, item);
  await updateDoc(addedDoc, { id: addedDoc.id });
  return addedDoc.id;
}
