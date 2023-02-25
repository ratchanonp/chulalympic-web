import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (credentials) => ({
                url: "auth/signin",
                method: "POST",
                body: credentials,
            }),
        }),
        signOut: build.mutation({
            query: () => ({
                url: "auth/signout",
                method: "POST",
            }),
        }),
    }),
});