import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockDate from 'mockdate'
import { Track, TrackSet } from "../DoData"
import TrackList from "./TrackList"

test('shows list of tracks', () => {
    const mockTracker = jest.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            { text: 'track name', tracked: [], },
            { text: 'other track', tracked: [], },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.getByText('other track')).toBeInTheDocument()
})

test('each track has a checkbox', () => {
    const mockTracker = jest.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            { text: 'track name', tracked: [], },
            { text: 'other track', tracked: [], },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} />)

    expect(screen.getByRole('checkbox', { name: 'track name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'other track' })).toBeInTheDocument()
})

test('each track shows last tracking timestamp', () => {
    const mockTracker = jest.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [1641147840000],
            },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.getByText('last tracked at:')).toBeInTheDocument()
    expect(screen.getByText('2022-01-02 13:24')).toBeInTheDocument()
})

test('each track shows no timestamp if tracking has never been activated', () => {
    const mockTracker = jest.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [],
            },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.queryByText('last tracked at:')).not.toBeInTheDocument()
    expect(screen.queryByText('2022-01-02 13:24')).not.toBeInTheDocument()
})

test('clicking a track\'s checkbox adds a current timestamp to that track', () => {
    MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
    const mockTracker = jest.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [],
            },
        ]
    }
    const expected = {
        text: 'track name',
        tracked: [1641147840000],
    }

    render(<TrackList trackSet={trackSet} tracker={mockTracker} />)

    userEvent.click(screen.getByRole('checkbox', { name: 'track name' }))

    expect(mockTracker).toHaveBeenCalledTimes(1)
    expect(mockTracker).toHaveBeenCalledWith(expected)
})
