import { getGamesFilter } from "@/interfaces/filter.interface";
import { CreateGame, GamesResponse } from "@/interfaces/game.interface";
import { api } from "./api";

export const gamesApi = api.injectEndpoints({
    endpoints: build => ({
        getGames: build.query<GamesResponse, getGamesFilter>({
            query: (filter) => ({
                url: "/games",
                params: {
                    date: filter.date?.toISOString(),
                    sportCode: filter.sports,
                    venueId: filter.venues,
                    facultyId: filter.faculty,
                },
            }),
        }),
        getDates: build.query<string[], void>({
            query: () => "games/dates",
        }),
        createGame: build.mutation<void, CreateGame>({
            query: (game) => ({
                url: "/games",
                method: "POST",
                body: game,
            }),
        }),
    })
});

export const { useLazyGetGamesQuery, useGetGamesQuery, useGetDatesQuery, useCreateGameMutation } = gamesApi;
