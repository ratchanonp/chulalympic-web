import { Venue } from "@/interfaces/venue.interface";
import { api } from "./api";

export const venueApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVenues: build.query<Venue[], void>({
            query: () => "venues",
            providesTags: ["Venue"],
        }),
        getVenue: build.query<Venue, string>({
            query: (id) => `venues/${id}`,
            providesTags: (result, error, id) => [{ type: "Venue", id }],
        }),
        addVenue: build.mutation<Venue, Omit<Venue, 'id'>>({
            query: (venue) => ({ url: "venues", method: "POST", body: venue }),
            invalidatesTags: ["Venue"],
        }),
        editVenue: build.mutation<Venue, Venue>({
            query: (venue) => ({ url: `venues/${venue.id}`, method: "PUT", body: venue, }),
            invalidatesTags: ["Venue"]
        }),
        deleteVenue: build.mutation<Venue, number>({
            query: (id) => ({ url: `venues/${id}`, method: "DELETE", }),
            invalidatesTags: ["Venue"]
        }),
    }),
});

export const {
    useGetVenuesQuery,
    useGetVenueQuery,
    useAddVenueMutation,
    useEditVenueMutation,
    useDeleteVenueMutation,
} = venueApi;