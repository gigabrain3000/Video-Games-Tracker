import { MouseEventHandler, ReactElement } from "react";

export default function ShadowWrapper({
  handleClick,
}: {
  handleClick: MouseEventHandler<HTMLDivElement> | undefined;
}): ReactElement {
  return (
    <div
      className="w-screen h-screen bg-gray-400 absolute z-2 opacity-50 left-0 top-0"
      onClick={handleClick}
    ></div>
  );
}
