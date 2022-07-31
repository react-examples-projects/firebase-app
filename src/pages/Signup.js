import { Text, Container, Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../config/firebase";

const auth = getAuth(firebaseApp);

export default function Signup() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Container style={{ maxWidth: "400px" }}>
        <Text weight="bold" className="text-center" h2>
          Registrate
        </Text>
        <form className="d-block mt-4" autoComplete="off" onSubmit={onSubmit}>
          <div className="mb-3">
            <Input
              type="text"
              name="fullname"
              label="Full name"
              fullWidth={true}
              required
            />
          </div>
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
        <Link to="/login" className="d-block w-100 mt-3">
          <Text className="text-center" color="primary">
            Ya tienes cuenta? Inicia sesión aquí
          </Text>
        </Link>
      </Container>
    </div>
  );
}
