export interface Sport {
    code: string;
    name: string;
    category?: SportCategory[];
    toString(): string;
}

export interface SportCategory {
    code: string;
    name: string;
    sportCode: "AH"
}

export type SportsResponse = Sport[];
export type SportResponse = Sport;