import { Text, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import useUser from "./hooks/useUser";

function App() {
  const { auth } = useUser();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Text>Probando</Text>
      <Button onClick={() => signOut(auth)}>Salir de la cuenta</Button>
    </div>
  );
}

export default App;
