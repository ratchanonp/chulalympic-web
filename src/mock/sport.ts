import { GameData } from "../components/partial/GameCard";

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

export const gameData: GameData = {
    type: "1v1",
    teams: [
        { faculty: "คณะวิศวกรรมศาสตร์", score: { type: "point", value: 10 } },
        { faculty: "คณะวิทยาศาสตร์", score: { type: "point", value: 5 } },
    ],
};

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
