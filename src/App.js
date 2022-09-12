import { Text, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";
import UsersList from "./components/UsersList";
import CreateUserModal from "./components/Modals/CreateUserModal";
import useToggle from "./hooks/useToggle";

function App() {
  const { auth, user } = useUser();
  const [isOpen, toggleOpen] = useToggle();

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "800px" }}>
      <Text className="mb-3 fw-bold">Bienvenido {user.email}</Text>

      <CreateUserModal {...{ isOpen, toggleOpen }} />

      <Button onClick={toggleOpen} size="sm" className="mb-3">
        Agregar Usuario
      </Button>

      <UsersList />

      <Button
        size="sm"
        color="error"
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
