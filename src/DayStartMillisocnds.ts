import { MinuteMilliseconds } from "./Constants"

export const dayNowStartMilliseconds = () => {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowTimeZoneOffset = now.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay) + nowTimeZoneOffset
    return dayStart
}

export const dayTimestampStartMilliseconds = (timestamp: number) => {
    const now = new Date(timestamp)
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowTimeZoneOffset = now.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay) + nowTimeZoneOffset
    return dayStart
}
