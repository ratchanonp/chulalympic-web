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
    start: string;
    status: GameStatus;
    type: string;
    updatedAt: string;
    sport: Sport;
    sportCategory: SportCategory;
    venue: Venue;
    participant: Participant[];
    note?: string
}

export interface Participant {
    id: number;
    facultyId: number;
    scoreType: string;
    value: number;
    medal?: string;
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
export type GameResponse = Game;


export interface CreateGame {
    venueId: number;
    sportCode: string;
    sportCategoryCode: string;
    start: string;
    status: GameStatus;
    type: string;
    participants: CreateParticipant[];
}

export interface UpdateGame extends Partial<Game> {
    id: string;
    participants: UpdateParticipant[]
}

export interface UpdateParticipant {
    id: number;
    facultyId: number;
    scoreType: string;
    value: number;
    medal?: any;
}

export interface CreateParticipant {
    facultyId: number;
}