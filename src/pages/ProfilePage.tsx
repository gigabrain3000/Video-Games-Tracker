import ProfileFavourites from "@/components/profileComponents/ProfileFavourites";
import ProfileHeader from "@/components/profileComponents/ProfileHeader";
import { ReactElement } from "react";

export default function SettingsPage(): ReactElement {
  return (
  <section className="w-[100%]">
    <ProfileHeader />
    <div>
      <ProfileFavourites />
    </div>
  </section>
  );
}