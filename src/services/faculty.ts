import { Faculty, FacultyResponse } from "@/interfaces/faculty.interface";
import { api } from "./api";

export const facultyApi = api.injectEndpoints({
    endpoints: (build) => ({
        getFaculties: build.query<Faculty[], void>({
            query: () => "faculty",
        }),
        getFaculty: build.query<FacultyResponse, string>({
            query: (id) => `faculty/${id}`,
        }),
    }),
})

export const { useGetFacultiesQuery, useGetFacultyQuery, useLazyGetFacultyQuery } = facultyApi;