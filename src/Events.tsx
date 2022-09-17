import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey, HourMilliseconds } from './Constants'
import { defaultEventData } from './storage/Storage'
import EventThingy from './event/Event'
import EventSorter from './event/EventSorter'


const Events = () => {
    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    // const startTime = Date.now() - 2 * HourMilliseconds
    // const endTime = Date.now() + 48 * HourMilliseconds
    const currentEvents = EventSorter(eventStorage)
        // .filter(event => (event.start + event.duration) > startTime && event.start < endTime)

    const size = currentEvents.length
    let result = []
    for (let index = 0; index < size; index++) {
        result.push(<EventThingy key={index} index={index} events={currentEvents}/>)
    }

    return <div>
        {result}
    </div>

}

export default Events