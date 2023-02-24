export interface Medal {
    id: number;
    name: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

export type Medals = Medal[];
export type MedalsResponse = Medals;