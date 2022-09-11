import useLazyloadImage from "../hooks/useLazyLoadImage";

export default function Post({ post }) {
  const { ref } = useLazyloadImage({
    src: `https://picsum.photos/id/${post.id}/400/400`,
    placeholder: `https://picsum.photos/id/${post.id}/20/20`,
  });
  return (
    <article>
      <img
        src={`https://picsum.photos/id/${post.id}/20/20`}
        ref={ref}
        alt={post.title}
        loading="lazy"
      />
      <p>{post.title}</p>
    </article>
  );
}
