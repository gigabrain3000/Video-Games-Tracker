import ProfileFavourites from "@/components/profileComponents/ProfileFavourites";
import ProfileHeader from "@/components/profileComponents/ProfileHeader";
import ProfileSidebar from "@/components/profileComponents/ProfileSidebar";
import { ReactElement } from "react";

export default function SettingsPage(): ReactElement {
  return (
  <section className="w-[100%]">
    <ProfileHeader />
    <div className="w-[80%] mx-auto flex gap-5">
      <ProfileSidebar />
      <ProfileFavourites />
    </div>
  </section>
  );
}