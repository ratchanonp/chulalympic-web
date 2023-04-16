import { Faculty, FacultyResponse } from "@/interfaces/faculty.interface";
import { api } from "./api";

export const facultyApi = api.injectEndpoints({
    endpoints: (build) => ({
        getFaculties: build.query<Faculty[], void>({
            query: () => "faculty",
            providesTags: ["Faculty"],
        }),
        getFaculty: build.query<FacultyResponse, string>({
            query: (id) => `faculty/${id}`,
            providesTags: (result, error, id) => [{ type: "Faculty", id }],
        }),
        addFaculty: build.mutation<FacultyResponse, Omit<Faculty, 'id'>>({
            query: (faculty) => ({ url: "faculty", method: "POST", body: faculty }),
            invalidatesTags: ["Faculty"],
        }),
        editFaculty: build.mutation<FacultyResponse, Faculty>({
            query: ({ id, name }) => ({ url: `faculty/${id}`, method: "PUT", body: { name } }),
            invalidatesTags: (result, error, { id }) => [{ type: "Faculty", id }],
        }),
        deleteFaculty: build.mutation<FacultyResponse, number>({
            query: (id) => ({ url: `faculty/${id}`, method: "DELETE", }),
            invalidatesTags: ["Faculty"]
        }),
    }),
})

export const {
    useGetFacultiesQuery,
    useGetFacultyQuery,
    useLazyGetFacultyQuery,
    useAddFacultyMutation,
    useEditFacultyMutation,
    useDeleteFacultyMutation,
} = facultyApi;