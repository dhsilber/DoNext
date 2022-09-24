import { MinuteMilliseconds } from "./Constants"

const commonDayStart = (now: Date) => {
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

export const formatDate = (dateTime: Date) => {
    const year = dateTime.getFullYear() + ''
    const month = (dateTime.getMonth() + 1) + ''
    const date = dateTime.getDate() + ''
    const hours = dateTime.getHours() + ''
    const minutes = dateTime.getMinutes() + ''

    const dateString = `${year}`
        + `-${month.padStart(2, '0')}`
        + `-${date.padStart(2, '0')}`
        + ` ${hours.padStart(2, '0')}`
        + `:${minutes.padStart(2, '0')}`
    return dateString
}