import { EventData } from '../DoData'

interface EventProps {
    index: number
    events: EventData[]
}

enum Day {
    Sunday,
    Monday,
    Tuesday,
}

const EventThingy = ({ index, events }: EventProps) => {
    const event = events[index]
    const eventStartDate = new Date(event.start)
    const dayOfWeek = Day[eventStartDate.getDay()]
    const startTime = eventStartDate.getHours() + ":" + eventStartDate.getMinutes()
    const eventEndDate = new Date(event.start + event.duration)
    const endTime = eventEndDate.getHours() + ":" + (eventEndDate.getMinutes() || "00")

    const displayDayOfWeek = index === 0 || new Date(events[index - 1].start).getDay() !== eventStartDate.getDay()

    return <div>
        {displayDayOfWeek && <h1>{dayOfWeek}</h1>}
        {(index === 0 || events[index - 1].start !== event.start) && <h2>{startTime}</h2>}
        <div key={event.start}>{event.text}</div>
        {(index === events.length - 1 || events[index + 1].start !== event.start + event.duration) && <h2>{endTime}</h2>}
    </div>
}

export default EventThingy