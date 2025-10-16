import { ReactElement } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, Plus } from "lucide-react";

export default function Header(): ReactElement {
  return (
    <header className="display: flex items-center justify-between">
      <h1 className="">Tracker</h1>
      <nav className="display: flex gap-3">
        <div className="display: flex gap-1.5">
          <Input placeholder="Search games" />
          <Button variant={"outline"}>Search</Button>
        </div>
        <div className="display: flex items-center">
          <h3>Guest</h3>
          <ChevronDown />
        </div>
        <Button variant={"outline"}><Plus />Add a Game</Button>
      </nav>
    </header>
  )
}