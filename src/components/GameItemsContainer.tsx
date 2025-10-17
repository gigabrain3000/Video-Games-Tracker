import { ReactElement, useState, useEffect } from "react";
import { getGamesResponse } from "@/services/gamesAPIServices";
import { createGamePreviewCardData } from "@/types/gamesTypes";
import { API_KEY } from "@/data/constants";
import GameItem from "./GameItem";
import FiltersContainer from "./FiltersContainer";
import Pagination from "./Pagination";

export default function GameItemsContainer(): ReactElement {
  const [APIGamesData, setAPIGamesData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const GAMES_API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=40`;

  useEffect(() => {
    getGamesResponse(GAMES_API_URL)
      .then((result: string) => {
        console.log(result);
        setAPIGamesData(result);
      })
      .catch((err: any) => console.error(err));
  }, [currentPage]);

  function changePage(e: any): void {
    setCurrentPage((page: number) => {
      page = Number(e.target.text);
      return page;
    });
  }

  return (
    <section className="mt-10 max-w-[1156]">
      <FiltersContainer />
      <div className="flex flex-wrap gap-6 justify-center my-6">
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
      <Pagination
        previousPage={currentPage > 3 ? currentPage - 1 : 2}
        currentPage={currentPage > 3 ? currentPage : 3}
        nextPage={currentPage > 3 ? currentPage + 1 : 4}
        lastPage={APIGamesData ? Math.ceil(APIGamesData.count / 40) : 100}
        handleClick={changePage}
      />
    </section>
  );
}
