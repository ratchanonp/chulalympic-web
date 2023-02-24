import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
    },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
