import { CreateUser, User } from "@/interfaces/user.interface";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => "users",
            providesTags: ["User"],
        }),
        addUser: build.mutation<User, Omit<CreateUser, "id" | "confirmPassword">>({
            query: (body) => ({
                url: "users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        editUser: build.mutation<User, Partial<Omit<CreateUser, "confirmPassword">>>({
            query: (body) => ({
                url: `users/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: build.mutation<User, number>({
            query: (id) => ({ url: `users/${id}`, method: "DELETE" }),
            invalidatesTags: ["User"],
        }),
        getMe: build.query<User, void>({
            query: () => "users/me",
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
    useGetMeQuery
} = userApi;