import { Venue } from "@/interfaces/venue.interface";
import { api } from "./api";

export const venueApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVenues: build.query<Venue[], void>({
            query: () => "venues",
        }),
    }),
});

export const { useGetVenuesQuery } = venueApi;