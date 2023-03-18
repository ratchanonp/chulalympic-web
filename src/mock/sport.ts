import { Game, GameStatus } from "@/interfaces/game.interface";

export const days: Date[] = [];
export const today = new Date();

for (let i = -5; i < 10; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() + i);
    days.push(day);
}

export const monthTHFormat = new Intl.DateTimeFormat("th", { month: "short" });
export const dayOfWeekTHFormat = new Intl.DateTimeFormat("th", { weekday: "short" });

export function isToday(day: Date) {
    return day.toString() === today.toString();
}

export const DDMMYYY_TH_FORMAT = new Intl.DateTimeFormat("th", { day: "numeric", month: "numeric", year: "numeric" });

export const gameData: Game = {
    id: "AH-INDI-0001",
    venueId: 1,
    sportCode: "AH",
    sportCategoryCode: "INDI",
    createdAt: new Date(),
    end: null,
    reporterId: null,
    start: new Date().toISOString(),
    status: GameStatus.SCHEDULED,
    type: "REGULAR",
    updatedAt: new Date().toISOString(),
    sport: {
        code: "AH",
        name: "กรีฑา"
    },
    sportCategory: {
        code: "INDI",
        name: "เดี่ยว",
        sportCode: "AH"
    },
    venue: {
        id: 1,
        name: "จามจุรี 9"
    },
    participant: [
        {
            facultyId: 1,
            scoreType: "POINT",
            value: 0,
            medal: null,
            gameId: "AH-INDI-0001",
            faculty: {
                id: 1,
                name: "วิศวกรรมศาสตร์"
            }
        },
        {
            facultyId: 2,
            scoreType: "POINT",
            value: 0,
            medal: null,
            gameId: "AH-INDI-0001",
            faculty: {
                id: 2,
                name: "วิทยาศาสตร์"
            }
        },
        {
            facultyId: 3,
            scoreType: "POINT",
            value: 0,
            medal: null,
            gameId: "AH-INDI-0001",
            faculty: {
                id: 3,
                name: "อักษรศาสตร์"
            }
        }
    ]
}

export const sportTypes = [
    "หมากฮอสไทย",
    "ซอฟท์บอล",
    "เทนนิส",
    "ฮอกกี้",
    "แบดมินตัน",
    "ยิงปืน",
    "ฟุตซอล",
    "ฟุตบอล",
    "บาสเกตบอล",
    "วอลเลย์บอล",
    "Valorant",
    "RoV",
    "พัตต์กอล์ฟ",
    "เอแมท",
    "หมากล้อม",
    "กรรเชียงบก",
    "บริดจ์",
    "หมากรุกไทย",
    "เบสบอล",
    "กรีฑา",
    "แฮนด์บอลในร่ม",
    "รักบี้ฟุตบอล",
    "มวยสากลสมัครเล่น",
    "กระดานยืนพาย",
    "ครอสเวิร์ด",
    "Crossfit (เพาะกายและฟิตเนส)",
    "ลีลาศ",
    "หมากรุุกสากล",
    "กระบี่บุคคล",
    "ดาบสองมือบุคคล",
].sort((a, b) => a.localeCompare(b, "th"));
