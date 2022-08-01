import { Text, Button, Input } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";
import {
  getFirestore,
  getDocs,
  getDoc,
  addDoc,
  collection,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import appFirebase from "./config/firebase";

const db = getFirestore(appFirebase);

function App() {
  const { auth, user } = useUser();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.fullname.value;
      const age = e.target.age.value;
      const profession = e.target.profession.value;
      const doc = await addDoc(collection(db, "usuarios"), {
        email,
        age,
        profession,
      });
      console.log({doc})
      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "600px" }}>
      <Text className="mb-3 fw-bold">Bienvenido {user.email}</Text>
      <form className="d-block mb-4" onSubmit={onSubmit}>
        <div className="mb-3">
          <Input label="Nombre completo" name="fullname" clearable fullWidth />
        </div>
        <div className="mb-3">
          <Input label="Edad" type="number" name="age" fullWidth />
        </div>
        <div className="mb-3">
          <Input label="Profesión" name="profession" clearable fullWidth />
        </div>
        <Button flat type="submit" color="success" className="w-1000">
          Agregar
        </Button>
      </form>

      <Button
        size="sm"
        onClick={() => signOut(auth)}
        className="position-absolute"
        style={{
          top: "0",
          right: "1rem",
        }}
        flat
      >
        Logout
      </Button>
    </div>
  );
}

export default App;
