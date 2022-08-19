import { async } from "@firebase/util";
import { Button, Text, Modal, Input } from "@nextui-org/react";
import { useState } from "react";
import FirebaseQueries from "../helpers/firebase";

const table = new FirebaseQueries("usuarios");

export default function ModalUserEdit({
  isOpenModalEdit,
  toggleOpenModalEdit,
  user,
}) {
  const [formState, setFormState] = useState(user);

  const onChangeField = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async () => {
    await table.update(user.id, formState);
  };

  return (
    <Modal closeButton aria-labelledby="modal-title" open={isOpenModalEdit}>
      <Modal.Header className="flex-column">
        <Text id="modal-title" size={18}>
          Edición de usuario
        </Text>
        <Text className="mt-2 text-muted">
          Estás editando al usuario {user.fullname}
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Input
          bordered
          fullWidth
          value={formState.fullname}
          onChange={onChangeField}
          name="fullname"
          color="primary"
        />

        <Input
          bordered
          fullWidth
          value={formState.email}
          onChange={onChangeField}
          name="email"
          type="email"
          color="primary"
        />

        <Input
          bordered
          fullWidth
          value={formState.age}
          onChange={onChangeField}
          name="age"
          type="number"
          color="primary"
        />
        <Input
          bordered
          fullWidth
          value={formState.profession}
          onChange={onChangeField}
          name="profession"
          color="primary"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={submit}>
          Editar
        </Button>
        <Button color="error" auto onClick={toggleOpenModalEdit}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
