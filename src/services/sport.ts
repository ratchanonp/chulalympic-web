import { SportResponse, SportsResponse } from "@/interfaces/sport.interface";
import { api } from "./api";

export const sportApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSports: build.query<SportsResponse, void>({
            query: () => "sports",
        }),
        getSport: build.query<SportResponse, string>({
            query: (code) => `sports/${code}`,
        }),
    }),
});

export const { useLazyGetSportQuery, useLazyGetSportsQuery, useGetSportQuery, useGetSportsQuery } = sportApi;