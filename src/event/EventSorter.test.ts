import MockDate from 'mockdate'
import { NowMarker } from '../Constants'
import { EventSet, Event } from '../DoData'
import eventSorter from './EventSorter'

const soureceData: EventSet = {
    routine: [
        {
            text: "Sleep",
            start: 82800000,
            duration: 26400000
        },
        {
            text: "Work - morning",
            start: 30600000,
            duration: 14400000
        },
        {
            text: "Work - afternoon",
            start: 48600000,
            duration: 14400000
        }
    ],
    events: [
        { text: "unexpected event", start: 1660025400000, duration: 900000 },
        { text: "demo event", start: 1663025400000, duration: 900000 },
        { text: "another event", start: 1663104600000, duration: 8220000 },
        { text: "third event", start: 1663112820000, duration: 780000 },
    ]
}

const fixedTestTime = Date.UTC(2022, 8, 12, 15, 30)
const resultData: Event[] = [

// One day:    86400000
    { text: "Work - morning", start: 1662985800000, duration: 14400000 },
    { text: NowMarker, start: fixedTestTime, duration: 0 },
    { text: "Work - afternoon", start: 1663003800000, duration: 14400000 },
    { text: "demo event", start: 1663025400000, duration: 900000 },
    { text: "Sleep", start: 1663038000000, duration: 26400000 },
    { text: "Work - morning", start: 1663072200000, duration: 14400000 },
    { text: "Work - afternoon", start: 1663090200000, duration: 14400000 },
    { text: "another event", start: 1663104600000, duration: 8220000 },
    { text: "third event", start: 1663112820000, duration: 780000 },
    { text: "Sleep", start: 1663124400000, duration: 26400000 },
    { text: "Work - morning", start: 1663158600000, duration: 14400000 },
    // { text: "Work - afternoon", start: 1663176600000, duration: 14400000 },
    // { text: "Sleep", start: 1663210800000, duration: 26400000 },
]

test('collect a set of current events from the full list', () => {
    MockDate.set(fixedTestTime)
    const filteredData = eventSorter(soureceData)

    expect(filteredData).toEqual(resultData)
})