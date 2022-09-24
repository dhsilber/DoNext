import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Track } from "../DoData"
import TrackEdit from "./TrackEdit"

const emptyTrack: Track = {
    text: '',
    tracked: [],
}

test('has form contents', () => {
    render(<TrackEdit track={emptyTrack} save={()=>{}}/>)
    // render(<TrackEdit track={emptyTrack} save={jest.fn()} />)

    screen.getByRole('textbox', { name: 'text:' })
})

test('done button sends current data to callback', () => {
    const mockSave = jest.fn()
    const expected:Track={
        text: 'name',
        tracked: [],
    }
    render(<TrackEdit track={emptyTrack} save={mockSave} />)
    userEvent.type(screen.getByLabelText('text:'), 'name')
    const element = screen.getByRole("button")

    fireEvent.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('initial data is default', () => {
    const mockSave = jest.fn()
    const expected: Track = {
        text: 'name',
        tracked: [3,2,1],
    }

    render(<TrackEdit track={expected} save={mockSave} />)

    expect(screen.getByLabelText('text:')).toHaveDisplayValue('name')
    const element = screen.getByRole("button")
    fireEvent.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})
