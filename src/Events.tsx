import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey } from './Constants'
import { defaultEventData } from './storage/Storage'
import EventThingy from './event/Event'


const Events = () => {
    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    const startTime = Date.now() - 2 * 60 * 60 * 1000
    const endTime = Date.now() + 48 * 60 * 60 * 1000
    const currentEvents = eventStorage.events
        .filter(event => (event.start + event.duration) > startTime && event.start < endTime)

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