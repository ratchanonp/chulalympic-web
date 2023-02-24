import { FacultyResponse } from "@/interfaces/faculty.interface";
import { api } from "./api";

export const facultyApi = api.injectEndpoints({
    endpoints: (build) => ({
        getFaculties: build.query<FacultyResponse, void>({
            query: () => "faculty",
        }),
    }),
})

export const { useGetFacultiesQuery } = facultyApi;