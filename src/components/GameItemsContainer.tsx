import { ReactElement, useState, useEffect } from "react";
import { getGamesResponse } from "@/services/gamesAPIServices";
import { createGamePreviewCardData } from "@/types/gamesTypes";
import { API_KEY } from "@/data/constants";
import GameItem from "./GameItem";
import FiltersContainer from "./FiltersContainer";
import PaginationContainer from "./PaginationContainer";

export default function GameItemsContainer(): ReactElement {
  const [APIGamesData, setAPIGamesData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [genre, setGenre] = useState<string>("");
  const GAMES_API_URL: string = `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=40`;
  const [filterURL, setFilterURL] = useState<string>(GAMES_API_URL);

  useEffect(() => {
    getGamesResponse(filterURL)
      .then((result: string) => {
        console.log(result);
        setAPIGamesData(result);
      })
      .catch((err: any) => console.error(err));
  }, [currentPage, filterURL]);

  function changePage(e: any): void {
    setCurrentPage((page: number) => {
      page = Number(e.target.text);
      return page;
    });
  }

  function applyFilter(): void {
    if (genre) {
      if (genre.includes(" ")) {
        return setFilterURL(GAMES_API_URL + `&genres=${genre.toLocaleLowerCase().replace(" ", "-")}`);
      } else if (genre.includes("RPG")) {
        return setFilterURL(GAMES_API_URL + `&genres=role-playing-games-rpg`);
      }
      return setFilterURL(GAMES_API_URL + `&genres=${genre.toLocaleLowerCase()}`);
    }
  }

  function resetFilter(): void {
    setFilterURL(GAMES_API_URL);
    setGenre("");
  }

  function handleGenre(data: string): void {
    setGenre(data);
  }

  return (
    <section className="mt-10 max-w-[1156px]">
      <FiltersContainer handleFilterClick={applyFilter} resetFilterClick={resetFilter} genreValue={handleGenre} />
      <div className="flex flex-wrap gap-5 justify-center py-2 my-6 overflow-y-auto h-[75vh]">
        {APIGamesData ? (
          APIGamesData.results.map((item: any) => {
            const gamePreviewCardData = createGamePreviewCardData(
              item.name,
              item.platforms,
              item.added,
              item.background_image
            );
            return <GameItem {...gamePreviewCardData} key={item.id} />;
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
      <PaginationContainer
        previousPage={currentPage > 3 ? currentPage - 1 : 2}
        currentPage={currentPage > 3 ? currentPage : 3}
        nextPage={currentPage > 3 ? currentPage + 1 : 4}
        lastPage={APIGamesData ? Math.ceil(APIGamesData.count / 40) : 100}
        handleClick={changePage}
      />
    </section>
  );
}
