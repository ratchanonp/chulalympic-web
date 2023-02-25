import { AuthPayload, AuthState } from "@/interfaces/auth.interface";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = getInitialData();

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<Omit<AuthPayload, "isAuthenticated">>) => {

            const { accessToken, refreshToken } = action.payload;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
        },
        signOut: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return initialState
        },
    },
});

export const { signOut } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

// Get Initial Data from local storage
function getInitialData(): AuthState {

    // Client side rendering
    if (typeof window === "undefined") return {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const isAuthenticated: boolean = !isTokenExpired(accessToken);

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
    };
}

// Parse JWT token
function parseJWT(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

// check jwt token expiration
function isTokenExpired(token: string | null) {
    if (!token) return true;
    const { exp } = parseJWT(token);
    return Date.now() >= exp * 1000;
}

