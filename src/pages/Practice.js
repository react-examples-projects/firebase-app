import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import InfiniteScroll from "react-infinite-scroller";
import Post from "../components/Post";
import "aos/dist/aos.css";
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
  const ITEMS_PER_LOAD = 5;
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [itemsPerLoad, setItemsPerLoad] = useState(ITEMS_PER_LOAD);

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

  const loadMore = () => {
    console.log("load more")
    if (!data.length) return;

    let postsData;
    if (itemsPerLoad + ITEMS_PER_LOAD > posts.length) {
      postsData = posts.slice(0, itemsPerLoad + posts.length);
    } else {
      postsData = posts.slice(0, itemsPerLoad + ITEMS_PER_LOAD);
    }
    setData(postsData);
    setItemsPerLoad(itemsPerLoad + ITEMS_PER_LOAD);
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    const data = posts.slice(0, ITEMS_PER_LOAD);
    console.log({ data });
    setData(data);
  }, [posts]);

  return (
    <div className="container-practice">
      <Panel leftComponent={<Left />} rightComponent={<Right />} />
      <Button onClick={fetchData}>Fetch data</Button>

      {data.length > 0 && (
        <section>
          <InfiniteScroll
            className="posts"
            pageStart={0}
            loadMore={loadMore}
            hasMore={data.length !== posts.length}
            // loader={
            //   <div className="loader" key={0}>
            //     Loading ...
            //   </div>
            // }
          >
            {data.map((post, index) => (
              <Post
                post={post}
                key={post.id}
                data-aos="fade-up"
                data-aos-duration={1000}
              />
            ))}
          </InfiniteScroll>
        </section>
      )}
    </div>
  );
}
