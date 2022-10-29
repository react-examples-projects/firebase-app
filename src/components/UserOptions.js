import { Button, Popover, Text } from "@nextui-org/react";
import { useState } from "react";
import { FiEye, FiTrash, FiEdit2 } from "react-icons/fi";
import FirebaseQueries from "../helpers/firebase";
import useToggle from "../hooks/useToggle";
import ModalUserEdit from "./ModalUserEdit";

const table = new FirebaseQueries("usuarios");

export default function UserOptions({ user }) {
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();
  const [isOpenPopover, setOpenPopover] = useState(false);
  return (
    <>
      <ModalUserEdit {...{ isOpenModalEdit, toggleOpenModalEdit, user }} />
      <div className="w-100 d-flex justify-content-end align-items-center">
        <Button
          style={{ fontSize: "1.3rem" }}
          iconRight={<FiEye />}
          light
          auto
        />
        <Button
          style={{ fontSize: "1.3rem" }}
          iconRight={<FiEdit2 />}
          onClick={toggleOpenModalEdit}
          light
          auto
        />
        <Popover
          placement="top"
          isOpen={isOpenPopover}
          onOpenChange={setOpenPopover}
        >
          <Popover.Trigger>
            <Button
              style={{ fontSize: "1.3rem" }}
              iconRight={<FiTrash />}
              color="error"
              light
              auto
            />
          </Popover.Trigger>
          <Popover.Content>
            <div className="p-3 text-center" style={{ maxWidth: "400px" }}>
              <Text className="d-block mb-2" b>
                Confirmación
              </Text>

              <Text className="mb-3" size={14}>
                ¿Está seguro de que desea eliminar este usuario? Al hacer esto,
                usted no podrá recuperar los datos.
              </Text>

              <div className="d-flex align-items-center gap-3">
                <Button
                  size="sm"
                  className="w-100"
                  onClick={() => setOpenPopover(false)}
                  light
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  className="w-100"
                  onClick={() => table.delete(user.id)}
                  shadow
                  color="error"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </>
  );
}
