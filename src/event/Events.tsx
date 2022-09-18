import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey } from '../Constants'
import { defaultEventData } from '../storage/Storage'
import EventThingy from './Event'
import EventSorter from './EventSorter'

const Events = () => {
    const [eventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    const currentEvents = EventSorter(eventStorage)

    const size = currentEvents.length
    let result = []
    for (let index = 0; index < size; index++) {
        result.push(<EventThingy key={index} index={index} events={currentEvents} />)
    }

    return <div className="events">
        {result}
    </div>

}

export default Events
