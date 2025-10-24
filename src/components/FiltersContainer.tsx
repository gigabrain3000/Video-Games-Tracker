import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { getGamesResponse } from "@/services/gamesAPIServices";
import { API_KEY } from "@/data/constants";

export default function FiltersContainer({
  handleFilterClick,
  resetFilterClick,
  genreValue,
}: {
  handleFilterClick: MouseEventHandler<HTMLButtonElement>;
  resetFilterClick: MouseEventHandler<HTMLButtonElement>;
  genreValue: (data: string) => void;
}): ReactElement {
  const GENRES_API_URL: string = `https://api.rawg.io/api/genres?key=${API_KEY}`;
  const [APIGenresData, setAPIGenresData] = useState<any>(null);
  const [genre, setGenre] = useState<string>("");

  useEffect(() => {
    getGamesResponse(GENRES_API_URL)
      .then((result: string) => {
        setAPIGenresData(result);
      })
      .catch((err: any) => console.error(err));
  }, []);

  const sendGenre = (value: string): void => {
    setGenre(value);
    genreValue(value);
  };

  return (
    <ul className="flex list-none gap-2 justify-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">Filter</PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3 bg-white border-1 rounded-xl mt-1 w-100 p-3 text-left">
            <h3 className="font-semibold text-2xl">Filters</h3>
            <Separator className="bg-gray-200 h-0.25" />
            <div>
              <h4 className="font-semibold">Metacritic</h4>
              <div className="flex gap-1">
                <div>
                  <span className="text-gray-500 font-light">From</span>
                  <Input placeholder="0"></Input>
                </div>
                <div>
                  <span className="text-gray-500 font-light">To</span>
                  <Input placeholder="100"></Input>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Genre</h4>
              <Select
                value={genre ? genre : ""}
                onValueChange={(value) => {
                  sendGenre(value);
                }}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Choose Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="h-50">
                    {APIGenresData ? (
                      APIGenresData.results.map((item: any) => {
                        return (
                          <SelectItem
                            value={item.name}
                            className="cursor-pointer"
                            key={item.id}
                          >
                            {item.name}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <p>Loading</p>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant={"outline"}
              onClick={(e) => {
                resetFilterClick(e);
                setGenre("");
              }}
              className="cursor-pointer"
            >
              Reset Filters
            </Button>
            <Button
              variant={"outline"}
              onClick={handleFilterClick}
              className="cursor-pointer"
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-1">
        <p>Sort By:</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer font-semibold">
            Popularity
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              Popularity
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Top Rated
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Game Title
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Release Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ul>
  );
}
