import { Text, Button, Input  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";
import FirebaseQueries from "./helpers/firebase";
import UsersList from "./components/UsersList";

const table = new FirebaseQueries("usuarios");

function App() {
  const { auth, user } = useUser();
  const [users, setUsers] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullname = e.target.fullname.value;
      const email = e.target.email.value;
      const age = e.target.age.value;
      const profession = e.target.profession.value;
      await table.insert({ fullname, email, age, profession });
      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = table.getDocuments(setUsers);
    return unsubscribe;
  }, []);

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "800px" }}>
      <Text className="mb-3 fw-bold">Bienvenido {user.email}</Text>

      <form className="d-block mb-4" onSubmit={onSubmit}>
        <div className="mb-3">
          <Input
            placeholder="Full name"
            name="fullname"
            color="primary"
            clearable
            fullWidth
            bordered
          />
        </div>

        <div className="mb-3">
          <Input
            placeholder="E-mail"
            type="email"
            name="email"
            color="primary"
            clearable
            fullWidth
            bordered
          />
        </div>
        <div className="mb-3">
          <Input
            placeholder="Age"
            type="number"
            name="age"
            color="primary"
            fullWidth
            bordered
          />
        </div>
        <div className="mb-3">
          <Input
            placeholder="Work"
            name="profession"
            color="primary"
            clearable
            fullWidth
            bordered
          />
        </div>
        <Button flat type="submit" color="success" className="w-1000">
          Agregar
        </Button>
      </form>

      <UsersList users={users} />

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
