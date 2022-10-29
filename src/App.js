import { Text, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";
import UsersList from "./components/UsersList";
import CreateUserModal from "./components/Modals/CreateUserModal";
import useToggle from "./hooks/useToggle";
import css from "./styles/app.module.scss";
import imgBanner from "./assets/banner.png";

function App() {
  const { auth, user } = useUser();
  const [isOpen, toggleOpen] = useToggle();

  console.log(user);

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "800px" }}>
      <CreateUserModal {...{ isOpen, toggleOpen }} />

      <div className={css.banner}>
        <Text className="m-0" size={20} h2>
          Bienvenido!
        </Text>
        <img src={imgBanner} alt="Banner" title="Banner" />
      </div>

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
