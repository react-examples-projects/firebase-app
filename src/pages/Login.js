import { Text, Container, Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Container style={{ maxWidth: "400px" }}>
        <Text weight="bold" className="text-center" h2>
          Iniciar Sesión
        </Text>
        <form className="d-block mt-4" autoComplete="off" onSubmit={onSubmit}>
          <div className="mb-3">
            <Input
              type="email"
              name="email"
              label="E-mail"
              fullWidth={true}
              required
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              name="password"
              label="Password"
              fullWidth={true}
              required
            />
          </div>
          <Button type="submit" name="submit" className="w-100">
            Aceptar
          </Button>
        </form>
        <Link to="/signup" className="d-block w-100 mt-3">
          <Text className="text-center" color="primary">
            No tienes cuenta? Registrate aquí
          </Text>
        </Link>
      </Container>
    </div>
  );
}
