import { DayMilliseconds, HourMilliseconds, NowMarker } from '../Constants'
import { dayTimestampStartMilliseconds } from '../DayStartMillisocnds'
import { DoEventsData, EventData } from '../DoData'

const eventSorter = (source: DoEventsData) => {

    const startTime = Date.now() - 2 * HourMilliseconds
    const endTime = Date.now() + 48 * HourMilliseconds

    const routineSchedule = source.routine

    const startMidnight = dayTimestampStartMilliseconds(startTime)
    const midnights: number[] = []
    for (let midnight = startMidnight; midnight < endTime; midnight += DayMilliseconds) {
        midnights.push(midnight)
    }

    const constructedEvents = midnights.flatMap((midnight) => {
        let routineEvents: EventData[] = []
        routineSchedule.map((routine) => {
            let event: EventData = {
                text: routine.text,
                start: midnight + routine.start,
                duration: routine.duration
            }
            routineEvents.push(event)
        })
        return routineEvents
    })
    constructedEvents.push({text: NowMarker,duration:0,start: Date.now()})

    const currentEvents = constructedEvents.concat(source.events)
        .sort((a, b) => { if (b.start > a.start) { return -1 } else { return 1 } })
        .filter(event => (event.start + event.duration) > startTime && event.start < endTime)

    return currentEvents
}

export default eventSorter