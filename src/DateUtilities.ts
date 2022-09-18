import { MinuteMilliseconds } from "./Constants"

const commonDayStart=(now:Date)=>{
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowTimeZoneOffset = now.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay) + nowTimeZoneOffset
    return dayStart
}

export const dayNowStartMilliseconds = () => {
    const now = new Date()
    return commonDayStart(now)
}

export const dayTimestampStartMilliseconds = (timestamp: number) => {
    const now = new Date(timestamp)
    return commonDayStart(now)
}

export const datestampToMinute = (): number => {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowHour = now.getHours()
    const nowMinute = now.getMinutes()
    const nowTimeZoneOffset = now.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay, nowHour, nowMinute) + nowTimeZoneOffset
    return dayStart
}
