
export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
}