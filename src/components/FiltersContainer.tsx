import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { ReactElement } from "react";

export default function FiltersContainer(): ReactElement {
  return (
    <ul className="flex list-none gap-2 justify-center">
      <Button variant={"outline"} className="cursor-pointer">Filter</Button>
      <div className="flex items-center gap-1">
        <p>Sort By:</p>
        <Button variant={"outline"} className="cursor-pointer">
          Popularity
          <ChevronDown />
        </Button>
      </div>
    </ul>
  );
}
