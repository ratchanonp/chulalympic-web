export interface Medal {
    id: number;
    name: string;
    gold: number;
    silver: number;
    bronze: number;
    Total: number;
}

export type MedalsResponse = Medal[];