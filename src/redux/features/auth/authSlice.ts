import { AuthPayload, AuthState } from "@/interfaces/auth.interface";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = getInitialData();

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<Omit<AuthPayload, "isAuthenticated">>) => {

            const { accessToken } = action.payload;

            localStorage.setItem("accessToken", accessToken);

            state.accessToken = accessToken;
            state.isAuthenticated = true;
        },
        signOut: (state, action: PayloadAction<void>) => {
            state.accessToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("accessToken");
        },
    },
});

export const { signIn, signOut } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

// Get Initial Data from local storage
function getInitialData(): AuthState {

    // Client side rendering
    if (typeof window === "undefined") return {
        accessToken: null,
        isAuthenticated: false,
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const isAuthenticated: boolean = !isTokenExpired(accessToken);

    return {
        accessToken,
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

