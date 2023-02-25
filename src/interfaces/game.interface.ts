import { Faculty } from "./faculty.interface";
import { Sport, SportCategory } from "./sport.interface";
import { Venue } from "./venue.interface";

export interface Game {
    id: string;
    venueId: number;
    sportCode: string;
    sportCategoryCode: string;
    createdAt: Date;
    end?: any;
    reporterId?: any;
    start: Date;
    status: GameStatus;
    type: string;
    updatedAt: Date;
    sport: Sport;
    sportCategory: SportCategory;
    venue: Venue;
    participant: Participant[];
}

export interface Participant {
    facultyId: number;
    scoreType: string;
    value: number;
    medal?: any;
    gameId: string;
    faculty: Faculty;
}

export enum GameStatus {
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
    SCORED = 'SCORED',
};

export type GamesResponse = Game[];