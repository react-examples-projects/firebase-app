import useLazyloadImage from "../hooks/useLazyLoadImage";

export default function Post({ post, ...args }) {
  const { ref } = useLazyloadImage({
    src: `https://picsum.photos/id/${post.id}/1000/1000`,
  });
  return (
    <article {...args}>
      <img
        ref={ref}
        alt={post.title}
        loading="lazy"
      />
      <p>{post.title}</p>
    </article>
  );
}
