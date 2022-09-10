
const dayStartMilliseconds = () => {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowTimeZoneOffset = now.getTimezoneOffset() * 60 * 1000
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay) + nowTimeZoneOffset
    return dayStart
}

export default dayStartMilliseconds