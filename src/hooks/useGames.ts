import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../services/api-client";
import apiClient from "../services/api-client";
import { GameQuery } from "../App";

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
  rating_top: number;
}

const useGames = (gemeQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gemeQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gemeQuery.genre?.id,
            parent_platforms: gemeQuery.platform?.id,
            ordering: gemeQuery.sortOrder,
            search: gemeQuery.searchText,
          },
        })
        .then((res) => res.data),
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
