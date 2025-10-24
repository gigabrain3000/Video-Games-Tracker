import { Gamepad2, House, User, Zap } from "lucide-react";
import { ReactElement } from "react";

export function Sidebar(): ReactElement {
  return (
    <aside className="mr-5 mt-25">
      <ul className="flex flex-col h-full gap-5">
        <li>
          <a href="#" className="flex gap-1 cursor-pointer font-semibold"><House className="pb-1" />Home</a>
        </li>
        <li>
          <a href="#" className="flex gap-1 cursor-pointer font-semibold"><Zap className="pb-1" />Trends</a>
        </li>
        <li>
          <a href="#" className="flex gap-1 cursor-pointer font-semibold"><Gamepad2 className="pb-1" />Games</a>
        </li>
        <li>
          <a href="#" className="flex gap-1 grow-2 cursor-pointer font-semibold align-bottom"><User className="pb-1" />Log In</a>
        </li>
      </ul>
    </aside>
  )
}