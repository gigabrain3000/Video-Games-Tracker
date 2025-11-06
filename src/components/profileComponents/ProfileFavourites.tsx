import { useAppContext } from "@/context/AppContext";
import { createGamePreviewCardData } from "@/types/gamesTypes";
import { ReactElement } from "react";
import GameItem from "../GameItem";

export default function ProfileFavourites(): ReactElement {
  const { currentUser } = useAppContext();
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-1">Favourite Games</h2>
      <div className="flex">
        {currentUser &&
        currentUser.favourites &&
        currentUser.favourites.length > 0 ? (
          currentUser.favourites.map((game: any) => {
            const gamePreviewCardData = createGamePreviewCardData(
              game.name,
              game.platforms,
              game.added,
              game.background_image,
              game.releaseDate,
              game
            );
            return <GameItem {...gamePreviewCardData} key={game.id} />;
          })
        ) : (
          <p>No favourite games</p>
        )}
      </div>
    </div>
  );
}
