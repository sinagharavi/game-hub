import { useInfiniteQuery } from "@tanstack/react-query";
import APICLient, { FetchResponse } from "../services/api-client";
import { GameQuery } from "../App";
import { Platform } from "./usePlatforms";

const apiClient = new APICLient<Game>("/games");
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gemeQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gemeQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gemeQuery.genre?.id,
          parent_platforms: gemeQuery.platform?.id,
          ordering: gemeQuery.sortOrder,
          search: gemeQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, //24h
  });

export default useGames;

// const useGames = (gemeQuery: GameQuery) =>
//   useData<Game>(
//     "/games",
//     {
//       params: {
//         genres: gemeQuery.genre?.id,
//         platforms: gemeQuery.platform?.id,
//         ordering: gemeQuery.sortOrder,
//         search: gemeQuery.searchText,
//       },
//     },
//     [gemeQuery]
//   );
