import { api } from "./api";

export const gamesApi = api.injectEndpoints({
    endpoints: build => ({
        getGames: build.query({
            query: () => ({ url: "games" }),
        }),
    }),
});
