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
import { fireStore } from "../config/firebase";

class FirebaseQueries {
  constructor(table) {
    this.table = table;
  }

  async insert(payload) {
    const res = await addDoc(collection(fireStore(), this.table), payload);
    return res;
  }

  async delete(id) {
    const res = await deleteDoc(doc(fireStore(), this.table, id));
    return res;
  }

  async update(id, payload) {
    const res = await setDoc(doc(fireStore(), this.table, id), payload);
    return res;
  }

  async get() {
    const querySnapshot = await getDocs(collection(fireStore(), this.table));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }

  getDocuments(onSuccess, onError) {
    const q = query(collection(fireStore(), this.table));
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
