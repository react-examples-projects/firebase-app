import { Loading } from "@nextui-org/react";

export default function LoaderPage() {
  return (
    <div
      className="d-flex flex-column w-100 align-content-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <Loading />
    </div>
  );
}
