import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export default function ProfileHeader(): ReactElement {
  const { currentUser } = useAppContext();
  return (
    <div className="w-[80%] mx-auto">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            alt="user"
            className="w-25 rounded-2xl"
          />
          <h2 className="self-end grow-2 text-left font-semibold text-2xl ml-2.5">
            {currentUser ? currentUser.username : null}
          </h2>
        </div>
        <Button className="self-end">Edit profile</Button>
      </div>
      <ul className="flex items-center bg-zinc-100 my-5 py-2 px-5 gap-10 rounded-xl font-semibold">
        <li className="cursor-pointer underline"><Link to={"/u/username"}>Profile</Link></li>
        <li className="cursor-pointer"><Link to={"/u/library"}>Games</Link></li>
        <li className="cursor-pointer"><Link to={"/u/library/favourites"}>Favourites</Link></li>
        <li className="cursor-pointer"><Link to={"/u/library/lists"}>Lists</Link></li>
      </ul>
    </div>
  );
}
