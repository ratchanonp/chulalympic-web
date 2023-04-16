const ROUND_TYPE = [
    { value: "REGULAR", label: "ปกติ" },
    { value: "QUALIFYING", label: "คัดเลือก" },
    { value: "QUARTER_FINAL", label: "ก่อนชิงชนะเลิศ (8)" },
    { value: "SEMI_FINAL", label: "รองชนะเลิศ (4)" },
    { value: "FINAL", label: "ชิงชนะเลิศ" },
]

const SCORE_TYPE = [
    { value: "POINT", label: "คะแนน" },
    { value: "TIME", label: "เวลา" },
    { value: "POSITION", label: "อันดับ" },
]

const MEDAL_TYPE = [
    { value: "", label: "ไม่มี" },
    { value: "Gold", label: "ทอง" },
    { value: "Silver", label: "เงิน" },
    { value: "Bronze", label: "ทองแดง" },
]

const GAME_STATUS = [
    { value: "SCHEDULED", label: "กำหนดเวลา" },
    { value: "IN_PROGRESS", label: "กำลังแข่ง" },
    { value: "COMPLETE", label: "เสร็จสิ้น" },
    { value: "SCORED", label: "ประกาศผล" },
]

export {
    ROUND_TYPE,
    SCORE_TYPE,
    MEDAL_TYPE,
    GAME_STATUS,
}

