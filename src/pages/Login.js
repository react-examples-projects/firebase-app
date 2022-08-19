import { Text, Container, Input, Button, Loading } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../helpers/schemas";
import useUser from "../hooks/useUser";
import useFormValidation from "../hooks/useFormValidation";
import ErrorText from "../components/ErrorText";
import { useState } from "react";

export default function Login() {
  const { auth } = useUser();
  const { register, handleSubmit, errors } = useFormValidation(loginSchema);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    const { email, password } = e;
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Container style={{ maxWidth: "400px" }}>
        <Text weight="bold" className="text-center" h2>
          Iniciar Sesión
        </Text>
        <form
          className="d-block mt-4"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              {...register("email")}
              type="email"
              name="email"
              label="E-mail"
              fullWidth
              status={!!errors.email?.message ? "error" : "default"}
              clearable
            />
            <ErrorText
              text={errors.email?.message}
              isVisible={!!errors.email?.message}
            />
          </div>
          <div className="mb-3">
            <Input.Password
              {...register("password")}
              name="password"
              label="Password"
              fullWidth
              status={!!errors.password?.message ? "error" : "default"}
            />
            <ErrorText
              text={errors.password?.message}
              isVisible={!!errors.password?.message}
            />
          </div>
          <Button
            type="submit"
            name="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Aceptar"}
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
