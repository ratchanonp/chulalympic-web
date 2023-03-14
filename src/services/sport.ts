import { CreateSportCategory, SportCategoriesResponse, SportResponse, SportsResponse } from "@/interfaces/sport.interface";
import { api } from "./api";

export const sportApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSports: build.query<SportsResponse, void>({
            query: () => "sports",
        }),
        getSport: build.query<SportResponse, string>({
            query: (code) => `sports/${code}`,
        }),
        getSportCategories: build.query<SportCategoriesResponse, string>({
            query: (gameId: string) => ({ url: `sports/${gameId}/categories` }),
        }),
        createCategory: build.mutation<void, CreateSportCategory>({
            query: (category) => ({
                url: `sports/${category.sportCode}/categories`,
                method: "POST",
                body: {
                    code: category.code,
                    name: category.name,
                },
            }),
        }),
    }),
});

export const { useLazyGetSportQuery, useLazyGetSportsQuery, useGetSportQuery, useGetSportsQuery, useLazyGetSportCategoriesQuery, useCreateCategoryMutation } = sportApi;