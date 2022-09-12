import { Button } from "@nextui-org/react";
import { FiEye, FiTrash, FiEdit2 } from "react-icons/fi";
import FirebaseQueries from "../helpers/firebase";
import useToggle from "../hooks/useToggle";
import ModalUserEdit from "./ModalUserEdit";

const table = new FirebaseQueries("usuarios");

export default function UserOptions({ user }) {
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();

  return (
    <>
      <ModalUserEdit {...{ isOpenModalEdit, toggleOpenModalEdit, user }} />
      <div className="w-100 d-flex justify-content-end align-items-center">
        <Button
          style={{ fontSize: "1.3rem" }}
          iconRight={<FiEye />}
          light
          auto
        ></Button>
        <Button
          style={{ fontSize: "1.3rem" }}
          iconRight={<FiEdit2 />}
          onClick={toggleOpenModalEdit}
          light
          auto
        ></Button>
        <Button
          style={{ fontSize: "1.3rem" }}
          iconRight={<FiTrash />}
          onClick={() => table.delete(user.id)}
          color="error"
          light
          auto
        ></Button>
      </div>
    </>
  );
}
