export interface Medal {
    id: number;
    name: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

export type MedalsResponse = Medal[];