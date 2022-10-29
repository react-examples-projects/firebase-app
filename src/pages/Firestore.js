import { Button, Container, Text } from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { fireStore } from "../config/firebase";

export default function Firestore() {
  useEffect(() => {
    (async () => {
     // const _doc = doc(fireStore(), "posts", "libardo");
      const collec = collection(fireStore(), "posts");

      const q = query(collec, where("author.name", "==", "Libardo Rengifo"));
      const qResult = await getDocs(q);
      const docs = qResult.docs.map((doc) => doc.data());
      console.log(docs);
      // qResult.forEach((doc) => {
      //   console.log(doc.data().author);
      // });

      // console.log({
      //   _doc,
      //   collec,
      // });

      const posts = [];
      const snapshot = await getDocs(collection(fireStore(), "posts"));

      snapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(posts);
    })();
  }, []);

  const addDocument = async () => {
    const today = new Date();
    const docRef = await addDoc(collection(fireStore(), "posts"), {
      title: "Titulo del post",
      date: today.toLocaleDateString("en-US"),
      dateObjec: new Date(),
      tags: ["Programming", "Software", "Computer"],
      author: {
        name: "Juan carlos",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
    });

    console.log(docRef);
  };

  return (
    <Container>
      <Text size={40} className="mt-2" h1>
        Firestore
      </Text>

      <Button onClick={addDocument}>Agregar documento</Button>
    </Container>
  );
}
