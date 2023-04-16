import { Dashboard } from "@/interfaces/dashboard.inteface";
import { api } from "./api";

export const dashboardApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDashboard: build.query<Dashboard, void>({
            query: () => ({ url: "dashboard" }),
        }),
    }),
});

export const { useGetDashboardQuery } = dashboardApi;