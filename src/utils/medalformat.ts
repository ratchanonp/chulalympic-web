
function medalLabel(medal: string) {
    switch (medal) {
        case "Gold":
            return "🏅 ทอง"
        case "Silver":
            return "🥈 เงิน"
        case "Bronze":
            return "🥉 ทองแดง"
    }
}

export {
    medalLabel,
}
