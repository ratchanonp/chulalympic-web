
export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
}

export interface AuthPayload {
    accessToken: string;

}