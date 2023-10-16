import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = (gemeQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gemeQuery.genre?.id,
        platforms: gemeQuery.platform?.id,
        ordering: gemeQuery.sortOrder,
        search: gemeQuery.searchText,
      },
    },
    [gemeQuery]
  );

export default useGames;
