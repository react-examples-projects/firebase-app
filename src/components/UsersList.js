import { Table, User, Text } from "@nextui-org/react";
import { useState, useEffect } from "react";
import FirebaseQueries from "../helpers/firebase";
import UserOptions from "./UserOptions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const table = new FirebaseQueries("usuarios");

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = table.getDocuments((data) => {
      setLoading(false);
      setUsers(data);
    });
    return unsubscribe;
  }, []);
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Table
        bordered
        className="px-0"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Full name</Table.Column>
          <Table.Column>Age</Table.Column>
          <Table.Column>Profession</Table.Column>
          <Table.Column></Table.Column>
        </Table.Header>
        <Table.Body
          css={
            isLoading
              ? {
                  maskImage: `-webkit-gradient(
                                  linear,
                                  left top,
                                  left bottom,
                                  from(rgba(0, 0, 0, 1)),
                                  to(rgba(0, 0, 0, 0.2))
                                )`,
                }
              : 0
          }
        >
          {isLoading
            ? Array(6)
                .fill(null)
                .map(() => (
                  <Table.Row>
                    <Table.Cell css={{ py: "0.3rem" }}>
                      <Skeleton height="40px" />
                    </Table.Cell>

                    <Table.Cell css={{ py: "0.3rem" }}>
                      <Skeleton height="40px" />
                    </Table.Cell>

                    <Table.Cell css={{ py: "0.3rem" }}>
                      <Skeleton height="40px" />
                    </Table.Cell>

                    <Table.Cell css={{ py: "0.3rem" }}>
                      <Skeleton height="40px" />
                    </Table.Cell>
                  </Table.Row>
                ))
            : users.map((user) => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      <User
                        squared
                        src={user.avatar}
                        name={user.fullname}
                        css={{ p: 0 }}
                      >
                        {user.email}
                      </User>
                    </Table.Cell>

                    <Table.Cell>
                      <Text size={14}>{user.age}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text size={14}>{user.profession}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <UserOptions user={user} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
    </SkeletonTheme>
  );
}
