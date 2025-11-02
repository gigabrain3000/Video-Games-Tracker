import { ReactElement } from "react";
import GameItem from "../GameItem";

export default function ProfileFavourites(): ReactElement {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-1">Favourite Games</h2>
      <div className="flex">
        <GameItem></GameItem>
        <GameItem></GameItem>
        <GameItem></GameItem>
        <GameItem></GameItem>
        <GameItem></GameItem>
      </div>
    </div>
  )
}