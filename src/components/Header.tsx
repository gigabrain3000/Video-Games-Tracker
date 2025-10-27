import { ReactElement } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Header(): ReactElement {
  return (
    <header className="display: flex items-center justify-between">
      <h1 className="text-3xl font-extrabold tracking-tight text-balance">Tracker</h1>
      <nav className="display: flex gap-3 items-center">
        <div className="display: flex gap-1.5">
          <Input placeholder="Search games" />
          <Button variant={"outline"} className="cursor-pointer">Search</Button>
        </div>
      </nav>
    </header>
  )
}