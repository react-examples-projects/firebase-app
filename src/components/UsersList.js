import { Table } from "@nextui-org/react";
import UserOptions from "./UserOptions";

export default function UsersList({ users }) {
  return (
    <Table
      className="px-0"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>Full name</Table.Column>
        <Table.Column>E-mail</Table.Column>
        <Table.Column>Age</Table.Column>
        <Table.Column>Profession</Table.Column>
        <Table.Column></Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map((user) => {
          return (
            <Table.Row key={user.id}>
              <Table.Cell>{user.fullname}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.profession}</Table.Cell>
              <Table.Cell>
                <UserOptions user={user} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
