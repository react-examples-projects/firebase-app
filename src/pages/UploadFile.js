import { Text, Button, Container, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { imageToBase64 } from "../helpers/utils";

import css from "../styles/upload.module.scss"

export default function UploadFile() {
  const [imgUrl, setImgUrl] = useState(null);
  const [imgs, setImgs] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData(e.target);
    body.append("upload_preset", "fgenbisi");

    try {
      const req = new Request(
        "https://api.cloudinary.com/v1_1/foxcompany/image/upload?tags=public",
        {
          method: "POST",
          body,
        }
      );
      const res = await fetch(req);
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeImage = async (e) => {
    const [file] = e.target.files;
    const result = await imageToBase64(file);
    setImgUrl(result);
  };

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        "https://res.cloudinary.com/foxcompany/image/list/public.json"
      );
      const json = await res.json();
      setImgs(json.resources);
      console.log(json.resources);
    }

    fetchImages();
  }, []);

  return (
    <Container css={{ mt: "1.3rem" }}>
      <Text css={{ mb: "1rem" }} h3>
        Subir archivo
      </Text>

      <form autoComplete="off" onSubmit={onSubmit}>
        <input type="file" id="file" name="file" onChange={onChangeImage} />
        <Image
          containerCss={{ margin: "1rem 0" }}
          width={400}
          height={400}
          src={
            imgUrl ||
            "https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
          }
          alt=""
          objectFit="cover"
          showSkeleton
        />
        <Button type="submit" color="gradient">
          Enviar
        </Button>
      </form>

    {
      console.log({imgs})
    }

      {imgs.length > 0 &&
        imgs.map((img) => (
          <img
            key={img.public_id}
            src={`http://res.cloudinary.com/foxcompany/image/upload/v1662767426/${img.public_id}`}
            alt={img.public_id}
          />
        ))}
    </Container>
  );
}
