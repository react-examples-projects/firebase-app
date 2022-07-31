import { Text, Container, Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signupSchema } from "../helpers/schemas";
import useUser from "../hooks/useUser";
import useFormValidation from "../hooks/useFormValidation";
import ErrorText from "../components/ErrorText";

export default function Signup() {
  const { auth } = useUser();
  const { register, handleSubmit, errors } = useFormValidation(signupSchema);

  const onSubmit = async (e) => {
    const { email, password } = e;
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
        <form
          className="d-block mt-4"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              {...register("fullname")}
              type="text"
              name="fullname"
              label="Full name"
              fullWidth={true}
              status={!!errors.fullname?.message ? "error" : "default"}
              clearable
            />
            <ErrorText
              text={errors.fullname?.message}
              isVisible={!!errors.fullname?.message}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("email")}
              type="email"
              name="email"
              label="E-mail"
              fullWidth={true}
              status={!!errors.email?.message ? "error" : "default"}
            />
            <ErrorText
              text={errors.email?.message}
              isVisible={!!errors.email?.message}
            />
          </div>
          <div className="mb-4">
            <Input.Password
              {...register("password")}
              name="password"
              label="Password"
              fullWidth={true}
              helperText="Mínimo 8 carácteres, minúsculas mayúscula con un número"
              status={!!errors.password?.message ? "error" : "default"}
            />
            <ErrorText
              className="mt-4"
              text={errors.password?.message}
              isVisible={!!errors.password?.message}
            />
          </div>
          <div className="mb-3">
            <Input.Password
              {...register("passwordConfirm")}
              name="passwordConfirm"
              label="Confirm password"
              fullWidth={true}
              status={!!errors.passwordConfirm?.message ? "error" : "default"}
            />
            <ErrorText
              text={errors.passwordConfirm?.message}
              isVisible={!!errors.passwordConfirm?.message}
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
