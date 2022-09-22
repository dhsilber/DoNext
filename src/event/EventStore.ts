import { Event, EventSet } from "../DoData";

export const eventStore = (
    event: Event,
    allEvents: EventSet,
    setStore: (data: EventSet) => void
) => {
    if (event.text.length === 0) {
        return
    }

    const existingEvent = allEvents.events.find(item => item.text === event.text)
    if (existingEvent === undefined) {
        allEvents.events.push(event)
    }
    else {
        existingEvent.start = event.start
        existingEvent.duration = event.duration
    }

    setStore(allEvents)
}
