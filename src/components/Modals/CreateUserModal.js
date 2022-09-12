import { Modal, Button, Input, Text } from "@nextui-org/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ProfileImage from "../ProfileImage";
import FirebaseQueries from "../../helpers/firebase";

const table = new FirebaseQueries("usuarios");

export default function CreateUserModal({ isOpen, toggleOpen }) {
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
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
      toggleOpen();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="Agregar Usuario"
      open={isOpen}
      onClose={toggleOpen}
    >
      <Modal.Header>
        <Text h3>
          Agregar Usuario
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form className="d-block mb-4" onSubmit={onSubmit}>
          <div className="mb-3">
            <ProfileImage imageFile={file} className="mx-auto mb-4"/>
            <FileUploader
              classes="w-100 mw-100"
              handleChange={handleChange}
              name="file"
              types={["JPG", "PNG", "GIF"]}
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

          <Button type="submit" className="w-100">
            Agregar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
