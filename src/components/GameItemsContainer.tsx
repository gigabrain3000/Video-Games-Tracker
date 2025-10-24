import { ReactElement, useState, useEffect, SetStateAction } from "react";
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
  const [metacriticRange, setMetacriticRange] = useState<string[]>(["1", "100"]);
  const [filterURL, setFilterURL] = useState<string>("");
  const GAMES_API_URL: string = `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=40${filterURL}`;

  useEffect(() => {
    getGamesResponse(GAMES_API_URL)
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
    console.log(filterURL);
  }

  function applyFilters(): void {
    let newFilterURL = "";
    if (genre) {
      if (genre.includes(" ")) {
        newFilterURL += `&genres=${genre.toLocaleLowerCase().replace(" ", "-")}`;
      } else if (genre.includes("RPG")) {
        newFilterURL += `&genres=role-playing-games-rpg`;
      } else {
        newFilterURL += `&genres=${genre.toLocaleLowerCase()}`;
      }
    }
    if (Number(metacriticRange[0]) > 0 && Number(metacriticRange[0]) < Number(metacriticRange[1]) && Number(metacriticRange[1]) <= 100) {
      newFilterURL += `&metacritic=${metacriticRange[0]},${metacriticRange[1]}`;
    }
    console.log(newFilterURL);
    return setFilterURL(newFilterURL);
  }

  function resetFilter(): void {
    setFilterURL("");
    setMetacriticRange(["1", "100"]);
    setGenre("");
  }

  function handleGenre(data: string): void {
    setGenre(data);
  }

  function handleMetacritic(data: SetStateAction<string[]>): void {
    setMetacriticRange(data);
  }

  return (
    <section className="mt-10 max-w-[1156px]">
      <FiltersContainer handleFilterClick={applyFilters} resetFilterClick={resetFilter} genreValue={handleGenre} metacriticValues={handleMetacritic} />
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
