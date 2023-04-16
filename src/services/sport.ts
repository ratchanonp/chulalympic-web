import { CreateSportCategory, SportCategoriesResponse, SportResponse, SportsResponse } from "@/interfaces/sport.interface";
import { api } from "./api";

export const sportApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSports: build.query<SportsResponse, void>({
            query: () => "sports",
            providesTags: ["Sport"]
        }),
        getSport: build.query<SportResponse, string>({
            query: (code) => `sports/${code}`,
            providesTags: ["Sport"]
        }),
        addSport: build.mutation<SportResponse, SportResponse>({
            query: (sport) => ({ url: "sports", method: "POST", body: sport }),
            invalidatesTags: ["Sport"]
        }),
        editSport: build.mutation<SportResponse, SportResponse>({
            query: (sport) => ({ url: `sports/${sport.code}`, method: "PUT", body: sport }),
            invalidatesTags: ["Sport"]
        }),
        deleteSport: build.mutation<void, string>({
            query: (code) => ({ url: `sports/${code}`, method: "DELETE" }),
            invalidatesTags: ["Sport"]
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

export const {
    useLazyGetSportQuery,
    useLazyGetSportsQuery,
    useGetSportQuery,
    useGetSportsQuery,
    useAddSportMutation,
    useEditSportMutation,
    useDeleteSportMutation,
    useLazyGetSportCategoriesQuery,
    useCreateCategoryMutation
} = sportApi;