export interface Sport {
    code: string;
    name: string;
    category?: SportCategory[];
    toString(): string;
}

export interface SportCategory {
    code: string;
    name: string;
    sportCode?: string;
}

export type SportsResponse = Sport[];
export type SportResponse = Sport;
export type SportCategoriesResponse = SportCategory[];

export interface CreateSportCategory {
    code: string;
    name: string;
    sportCode: string;
}