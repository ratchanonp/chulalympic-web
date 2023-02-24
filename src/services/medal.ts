import { MedalsResponse } from "@/interfaces/medal.inteface";
import { api } from "./api";

export const medalApi = api.injectEndpoints({
    endpoints: build => ({
        getMedals: build.query<MedalsResponse, void>({
            query: () => ({ url: "medals" }),
        }),
    }),
});


export const { useGetMedalsQuery } = medalApi;