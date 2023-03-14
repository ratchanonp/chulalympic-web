export interface FilterState {
    date: Date;
    sports: string[];
    venues: string[];
    faculty: string[];
}

export interface getGamesFilter {
    date?: Date;
    sports?: string[];
    venues?: string[];
    faculty?: string[];
}