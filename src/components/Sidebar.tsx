import { Gamepad2, House, User, Zap } from "lucide-react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function Sidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <>
      <aside className="mr-5 mt-25">
        <ul className="flex flex-col h-full gap-5">
          <li>
            <h3 className="flex gap-1 cursor-pointer font-semibold" onClick={() => navigate("/")}><House className="pb-1" />Home</h3>
          </li>
          <li>
            <a href="#" className="flex gap-1 cursor-pointer font-semibold"><Zap className="pb-1" />Trends</a>
          </li>
          <li>
            <a href="#" className="flex gap-1 cursor-pointer font-semibold"><Gamepad2 className="pb-1" />Games</a>
          </li>
          <li>
            <h3 className="flex gap-1 grow-2 cursor-pointer font-semibold align-bottom" onClick={() => navigate("/login")}><User className="pb-1" />Log In</h3>
          </li>
        </ul>
      </aside>
    </>
  )
}