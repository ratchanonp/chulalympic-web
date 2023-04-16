import { Faculty } from "./faculty.interface";
import { Game } from "./game.interface";
import { Medal } from "./medal.inteface";

export interface Dashboard {
    todayGames: number;
    todayScoredGames: number;
    totalGames: number;
    totalScoredGames: number;

    todayGamesList: Game[];
    latestUpdateGamesList: Game[];

    facultyParticipation: FacultyParticipation[];
    facultyMedals: Medal[];
}

export interface FacultyParticipation extends Faculty {
    participation: number;
}
