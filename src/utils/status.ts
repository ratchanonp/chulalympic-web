import { GameStatus } from "@/interfaces/game.interface";

const colorScheme = (status: GameStatus) => {
    switch (status) {
        case GameStatus.SCHEDULED:
            return "yellow";
        case GameStatus.IN_PROGRESS:
            return "blue";
        case GameStatus.COMPLETE:
            return "green";
        case GameStatus.SCORED:
            return "pink";
        default:
            return "gray";
    }
}

const statusName = (status: GameStatus) => {
    switch (status) {
        case GameStatus.SCHEDULED:
            return "กำหนดเวลา";
        case GameStatus.IN_PROGRESS:
            return "กำลังเล่น";
        case GameStatus.COMPLETE:
            return "เสร็จสิ้น";
        case GameStatus.SCORED:
            return "ประกาศผล";
        default:
            return "ยังไม่เริ่ม";
    }
}

export { colorScheme, statusName };
