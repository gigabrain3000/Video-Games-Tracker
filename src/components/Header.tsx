import { ReactElement } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, Plus } from "lucide-react";

export default function Header(): ReactElement {
  return (
    <header className="display: flex items-center justify-between">
      <h1 className="text-3xl font-extrabold tracking-tight text-balance">Tracker</h1>
      <nav className="display: flex gap-3 items-center">
        <div className="display: flex items-center cursor-pointer">
          <h3>Guest</h3>
          <ChevronDown />
        </div>
        <a href="#" className="no-underline cursor-pointer">Games</a>
        <div className="display: flex gap-1.5">
          <Input placeholder="Search games" />
          <Button variant={"outline"}>Search</Button>
        </div>
        <Button variant={"outline"}><Plus />Add a Game</Button>
      </nav>
    </header>
  )
}