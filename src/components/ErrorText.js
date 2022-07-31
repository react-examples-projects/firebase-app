import { BiErrorCircle } from "react-icons/bi";
import { Text } from "@nextui-org/react";
import cls from "classnames";

export default function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  className,
  ...props
}) {
  return isVisible ? (
    <div
      {...props}
      className={cls("d-flex align-items-center mb-1", className)}
    >
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <Text
        className="my-0"
        style={{ color: "#ff005c", marginLeft: "5px" }}
        small
      >
        {text}
      </Text>
    </div>
  ) : null;
}
