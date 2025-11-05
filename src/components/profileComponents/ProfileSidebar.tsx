import { useAppContext } from "@/context/AppContext";
import { ReactElement } from "react";
import { Separator } from "../ui/separator";

export default function ProfileSidebar(): ReactElement {
  const {currentUser} = useAppContext();
  return (
    <aside>
      <ul className="text-left">
        <div>
          <h4 className="font-semibold">Bio</h4>
          <p className="font-light">{currentUser?.bio && currentUser.bio.length > 0 ? currentUser?.bio : "Nothing here!" }</p>          
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold">Personal Ratings</h4>
          <div>put chart here</div>
        </div>
      </ul>
    </aside>
  )
}