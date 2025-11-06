import { ReactElement, useState } from "react";
import {
  doc,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/config/firebase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Heart, Plus } from "lucide-react";
import { gamePreviewCard } from "@/types/gamesTypes";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { IconButton } from "./ui/shadcn-io/icon-button";

export default function TrackingPopUp({
  props,
}: {
  props: gamePreviewCard;
}): ReactElement {
  const { currentUser } = useAppContext();
  const [status, setStatus] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const trackChangesInGame = async (): Promise<void> => {
    if (!currentUser) return;
    const updatedGame = {
      ...props.fullData,
      trackingStatus: status,
      userRating: rating,
      isLiked: liked,
    };
    try {
      const userData: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "users",
        currentUser.id
      );
      const currentLibrary: any[] = [...(currentUser.gamesLibrary || [])];
      const currentFavourites: any[] = [...(currentUser.favourites || [])];
      const existingLibraryIndex = currentLibrary.findIndex(
        (game) => game.name === updatedGame.name
      );
      const existingFavouritesIndex = currentFavourites.findIndex(
        (game) => game.name === updatedGame.name
      );

      if (existingLibraryIndex !== -1) {
        currentLibrary[existingLibraryIndex] = updatedGame;
      } else {
        currentLibrary.push(updatedGame);
      }

      if (liked) {
        if (existingFavouritesIndex !== -1) {
          currentFavourites[existingFavouritesIndex] = updatedGame;
        } else {
          currentFavourites.push(updatedGame);
        }
      }

      await updateDoc(userData, {
        gamesLibrary: currentLibrary,
        favourites: currentFavourites,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer flex items-center gap-1">
        <Plus size={18} />
        {props.addedBy}
      </DialogTrigger>
      <DialogContent onSubmit={trackChangesInGame} className="p-5">
        <DialogHeader className="flex flex-row items-baseline">
          <DialogTitle className="text-xl">{props.title}</DialogTitle>
          <DialogDescription className="font-light text-lg">
            {props.fullData.released.slice(0,4)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5">
          <img
            className="block max-w-[200px]"
            src={props.backgroundImage}
            alt={props.title}
          />
          <div>
            <h3 className="text-lg font-semibold">Rating</h3>
            <Rating
              defaultValue={0}
              onValueChange={(value: number) => setRating(value)}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} />
              ))}
            </Rating>
            <h3 className="text-lg font-semibold">Status</h3>
            <Select
              value={status ? status : ""}
              onValueChange={(value: string) => setStatus(value)}
            >
              <SelectTrigger
                aria-placeholder=""
                className="cursor-pointer flex items-center rounded-md font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-2 leading-0 text-sm"
              >
                <SelectValue placeholder={"Set status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Played">Played</SelectItem>
                <SelectItem value="Shelved">Shelved</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Like</h3>
            <IconButton
              icon={Heart}
              color={[0, 0, 0]}
              active={liked}
              size="lg"
              onClick={() => setLiked(!liked)}
            ></IconButton>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={trackChangesInGame}
          >
            Confirm
          </Button>
          <Button className="cursor-pointer" variant={"outline"}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
