import { ReactElement } from "react";
import { gamePreviewCard } from "@/types/gamesTypes";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function GameItem (props: gamePreviewCard): ReactElement {
  return (
    <div className="border rounded-[5%] flex flex-col cursor-pointer bg-zinc-100">
      <img src={props.backgroundImage} alt={props.title} className="block rounded-t-[5%] w-3xs"/>
      <div>
        <div className="text-left p-4 max-w-[256px]">
          <h3 className="mb-2 font-semibold text-l tracking-tight first:mt-0 wrap-break-word">{props.title}</h3>
          <Button variant={"outline"} className="cursor-pointer"><Plus />{props.addedBy}</Button>
        </div>
      </div>
    </div>
  );
}