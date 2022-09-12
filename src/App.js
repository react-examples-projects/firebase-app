import { Text, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { FileUploader } from "react-drag-drop-files";

import useUser from "./hooks/useUser";
import FirebaseQueries from "./helpers/firebase";
import UsersList from "./components/UsersList";
import ProfileImage from "./components/ProfileImage";

const table = new FirebaseQueries("usuarios");

function App() {
  const { auth, user } = useUser();
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (file) => {
    setFile(file);
    console.log(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullname = e.target.fullname.value;
      const email = e.target.email.value;
      const age = e.target.age.value;
      const profession = e.target.profession.value;

      const body = new FormData();
      body.append("upload_preset", "fgenbisi");
      body.append("file", file);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/foxcompany/image/upload?tags=public",
        {
          method: "POST",
          body,
        }
      );
      const json = await res.json();
      const avatar = json.url;

      await table.insert({ fullname, email, age, profession, avatar });
      
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
          <ProfileImage imageFile={file} />
          <FileUploader
            classes="w-100 mw-100"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            label="Selecciona la imágen de perfil"
          />
        </div>

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
