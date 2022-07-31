import { Text, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";

function App() {
  const { auth, user } = useUser();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Text className="mb-3">{user.email}</Text>
      <Button onClick={() => signOut(auth)}>Salir de la cuenta</Button>
    </div>
  );
}

export default App;
