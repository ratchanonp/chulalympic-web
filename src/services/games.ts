import { GamesResponse } from "@/interfaces/game.interface";
import { api } from "./api";

export const gamesApi = api.injectEndpoints({
    endpoints: build => ({
        getGames: build.query<GamesResponse, void>({
            query: () => ({ url: "games" }),
        }),
    }),
});

export const { useLazyGetGamesQuery, useGetGamesQuery } = gamesApi;
