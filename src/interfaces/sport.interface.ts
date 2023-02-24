export interface Sport {
    code: string;
    name: string;
    category: SportCategory[];
    toString(): string;
}

export interface SportCategory {
    code: string;
    name: string;
}

export type Sports = Sport[];
export type SportsResponse = Sports;
export type SportResponse = Sport;