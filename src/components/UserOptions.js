import { Button, Popover } from "@nextui-org/react";
import { FiEye, FiEyeOff, FiTrash, FiEdit2, FiX } from "react-icons/fi";
import { useState } from "react";
import FirebaseQueries from "../helpers/firebase";
import useToggle from "../hooks/useToggle";
import ModalUserEdit from "./ModalUserEdit";

const table = new FirebaseQueries("usuarios");

export default function UserOptions({ user }) {
  const [isOpen, setOpen] = useState(false);
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();

  return (
    <>
      <ModalUserEdit {...{ isOpenModalEdit, toggleOpenModalEdit, user }} />
      <Popover
        placement="right"
        disableShadow
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <Popover.Trigger>
          <Button
            auto
            flat
            className="ms-auto"
            icon={isOpen ? <FiEyeOff /> : <FiEye />}
          >
            View options
          </Button>
        </Popover.Trigger>
        <Popover.Content className="p-3">
          <Button className="mb-2" size="sm" onClick={toggleOpenModalEdit} flat>
            <FiEdit2 className="me-2" />
            Editar
          </Button>
          <Button
            color="error"
            size="sm"
            onClick={() => table.delete(user.id)}
            flat
          >
            <FiTrash className="me-2" />
            Eliminar
          </Button>
        </Popover.Content>
      </Popover>
    </>
  );
}
