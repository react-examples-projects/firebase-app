import {
  getDocs,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";

class FirebaseQueries {
  constructor(table) {
    this.table = table;
  }

  async insert(payload) {
    const res = await addDoc(collection(db(), this.table), payload);
    return res;
  }

  async delete(id) {
    const res = await deleteDoc(doc(db(), this.table, id));
    return res;
  }

  async update(id, payload) {
    const res = await setDoc(doc(db(), this.table, id), payload);
    return res;
  }

  async get() {
    const querySnapshot = await getDocs(collection(db(), this.table));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }

  getDocuments(onSuccess, onError) {
    const q = query(collection(db(), this.table));
    const unsubscribe = onSnapshot(
      q,
      (queries) => {
        const docs = [];
        queries.forEach((doc) => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        onSuccess(docs);
      },
      onError
    );
    return unsubscribe;
  }
}

export default FirebaseQueries;
