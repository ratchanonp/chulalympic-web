import { VenuesResponse } from "@/interfaces/venue.interface";
import { api } from "./api";

export const venueApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVenues: build.query<VenuesResponse, void>({
            query: () => "venues",
        }),
    }),
});

export const { useGetVenuesQuery } = venueApi;