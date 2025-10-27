import { ReactElement, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getGamesResponse } from "@/services/gamesAPIServices";
import { createGamePreviewCardData } from "@/types/gamesTypes";
import { API_KEY } from "@/data/constants";
import GameItem from "../components/GameItem";
import FiltersContainer from "../components/FiltersContainer";
import PaginationContainer from "../components/PaginationContainer";

export default function GameItemsPage(): ReactElement {
  const [APIGamesData, setAPIGamesData] = useState<any>(null);
  const [pageParams, setPageParams] = useSearchParams();
  const [pendingFilters, setPendingFilters] = useState<{
    genre?: string;
    metacritic?: string;
  }>({});
  const page = pageParams.get("page");
  const metacritic = pageParams.get("metacritic");
  const genre = pageParams.get("genre");
  const GAMES_API_URL: string = `https://api.rawg.io/api/games?key=${API_KEY}${
    page ? `&page=${page}` : ""
  }&page_size=40${genre ? `&genres=${genre}` : ""}${
    metacritic ? `&metacritic=${metacritic}` : ""
  }`;

  useEffect((): void => {
    getGamesResponse(GAMES_API_URL)
      .then((result: string) => {
        console.log(result);
        setAPIGamesData(result);
      })
      .catch((err: any) => console.error(err));
  }, [page, metacritic, genre]);

  const updateSearchParams = (params: Record<string, string | null>) => {
    const currentParams = Object.fromEntries(pageParams.entries());
    const filteredEntries = Object.entries(params).filter(
      ([, value]) => value !== null && value !== ""
    );
    const newParams = Object.fromEntries(filteredEntries) as Record<
      string,
      string
    >;
    
    if (JSON.stringify(currentParams) === JSON.stringify(newParams)) return;
    setPageParams(newParams);
  };

  function changePage(e: any): void {
    updateSearchParams({ page: e.target.text, metacritic, genre });
  }

  function applyFilters(): void {
    const finalGenre = pendingFilters.genre ?? genre;
    const finalMetacritic = pendingFilters.metacritic ?? metacritic;

    if (finalGenre) {
      let normalizedGenre = finalGenre;

      if (finalGenre.includes(" ")) {
        normalizedGenre = finalGenre.toLocaleLowerCase().replace(" ", "-");
      } else if (finalGenre.includes("RPG")) {
        normalizedGenre = "role-playing-games-rpg";
      } else {
        normalizedGenre = finalGenre.toLocaleLowerCase();
      }

      updateSearchParams({
        page,
        metacritic: finalMetacritic,
        genre: normalizedGenre,
      });
    }
    setPendingFilters({});
  }

  function resetFilter(): void {
    updateSearchParams({
      page: null,
      metacritic: null,
      genre: null,
    });
  }

  function handleGenre(data: string): void {
    setPendingFilters((prev) => ({ ...prev, genre: data }));
  }

  function handleMetacritic(data: string[]): void {
    setPendingFilters((prev) => ({ ...prev, metacritic: data.join(",") }));
  }

  return (
    <section className="mt-10 max-w-[1156px] mx-auto">
      <FiltersContainer
        handleFilterClick={applyFilters}
        resetFilterClick={resetFilter}
        genreValue={handleGenre}
        metacriticValues={handleMetacritic}
      />
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
        previousPage={Number(page) > 3 ? Number(page) - 1 : 2}
        currentPage={Number(page) > 3 ? Number(page) : 3}
        nextPage={Number(page) > 3 ? Number(page) + 1 : 4}
        lastPage={APIGamesData ? Math.ceil(APIGamesData.count / 40) : 100}
        handleClick={changePage}
      />
    </section>
  );
}
