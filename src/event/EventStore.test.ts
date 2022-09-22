import { Event, EventSet } from "../DoData"
import { eventStore } from "./EventStore"

test('stores a new event', () => {
    const mockStore = jest.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: []
    }
    const event: Event = {
        text: 'new event',
        start: 123,
        duration: 0,
    }
    const expectedEventSet: EventSet = {
        routine: [],
        events: [event]
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedEventSet)
})

test('does not store a event with an empty name', () => {
    const mockStore = jest.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: []
    }
    const event: Event = {
        text: '',
        start: 123,
        duration: 0,
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).not.toHaveBeenCalled()
})

test('updates an existing event', () => {
    const mockStore = jest.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: [{ text: 'event', start: 123, duration: 0 }]
    }
    const event: Event = {
        text: 'event',
        start: 123,
        duration: 15,
    }
    const expectedEventSet: EventSet = {
        routine: [],
        events: [event]
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedEventSet)
})
