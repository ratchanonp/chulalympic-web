import { getGamesFilter } from "@/interfaces/filter.interface";
import { CreateGame, Game, GameResponse, GamesResponse, UpdateGame } from "@/interfaces/game.interface";
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
        getGame: build.query<Game, string>({
            query: (id) => `games/${id}`,
        }),
        getDates: build.query<string[], void>({
            query: () => "games/dates",
        }),
        createGame: build.mutation<GameResponse, CreateGame>({
            query: (game) => ({
                url: "/games",
                method: "POST",
                body: game,
            }),
        }),
        updateGame: build.mutation<GameResponse, UpdateGame>({
            query: (game) => ({
                url: `/games/${game.id}`,
                method: "PATCH",
                body: game,
            }),
        })
    }),
});

export const { useLazyGetGamesQuery, useGetGamesQuery, useGetDatesQuery, useCreateGameMutation, useLazyGetGameQuery, useUpdateGameMutation } = gamesApi;
