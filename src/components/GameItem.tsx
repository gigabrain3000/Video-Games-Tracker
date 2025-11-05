import { ReactElement } from "react";
import { gamePreviewCard } from "@/types/gamesTypes";
import TrackingPopUp from "./TrackingPopUp";

export default function GameItem(props: gamePreviewCard): ReactElement {
  return (
    <div className="border rounded-[5%] flex flex-col bg-zinc-100 transform hover:scale-105 duration-100">
      <img
        src={props.backgroundImage}
        alt={props.title}
        className="block rounded-t-[5%] w-xs"
      />
      <div>
        <div className="text-left p-3 max-w-xs">
          <h3 className="mb-1.5 font-semibold text-l tracking-tight first:mt-0 wrap-break-word leading-6">
            {props.title}
          </h3>
          <TrackingPopUp props={props}></TrackingPopUp>
        </div>
      </div>
    </div>
  );
}
