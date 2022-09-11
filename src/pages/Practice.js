import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../components/Post";
import "../styles/practice.scss";

function Panel({ leftComponent, rightComponent }) {
  useEffect(() => {
    console.log(process.env.PUBLIC_URL);
  }, []);

  return (
    <div className="panel">
      <div className="panel-left">{leftComponent}</div>
      <div className="panel-content">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          aspernatur sequi officia adipisci illum doloremque nam, repellat
          molestias tempora ipsa explicabo, dolores, obcaecati sed eos odio
          nesciunt consectetur neque corporis.
        </p>
      </div>
      <div className="panel-right">{rightComponent}</div>
    </div>
  );
}

export default function Practice() {
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    import("../helpers/utils").then(async (imp) => {
      const data = await imp.getData();
      setPosts(data);
    });
  };

  const Left = () => {
    return (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias omnis,
        voluptates dolorum minus assumenda nihil quia illum ea temporibus nulla
        nam sed tenetur amet. Atque ipsa est iste dolores obcaecati!
      </p>
    );
  };

  const Right = () => {
    return (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias omnis,
        voluptates dolorum minus assumenda nihil quia illum ea temporibus nulla
        nam sed tenetur amet. Atque ipsa est iste dolores obcaecati!
      </p>
    );
  };

  return (
    <div className="container-practice">
      <Panel leftComponent={<Left />} rightComponent={<Right />} />
      <Button onClick={fetchData}>Fetch data</Button>

      {posts.length > 0 && (
        <section className="posts">
          {posts.map((post) => (
            <Post post={post} key={post.id}/>
          ))}
        </section>
      )}
    </div>
  );
}
