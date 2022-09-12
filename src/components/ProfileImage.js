import { useEffect, useState } from "react";
import { imageToBase64 } from "../helpers/utils";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 150px;
  max-height: 150px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  border-radius: 50%;
`;

export default function ProfileImage({ imageFile = null, ...args }) {
  const [img64, setImg64] = useState(
    "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
  );
  useEffect(() => {
    (async () => {
      if (imageFile) {
        const base64 = await imageToBase64(imageFile);
        setImg64(base64);
      }
    })();
  }, [imageFile]);

  return (
    <Image src={img64} alt="Profile Avatar" title="Profile Avatar" {...args} />
  );
}
