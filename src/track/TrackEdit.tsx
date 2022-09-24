import React, { useState } from 'react'
import { Track } from '../DoData'

interface TrackEditProps {
    track: Track
    save: (track: Track) => void
}

const TrackEdit = ({ track, save }: TrackEditProps) => {
    const [text, setText] = useState(track.text || '')
    const [tracked] = useState(track.tracked || [])

    return <>
        <label>text:<input
            value={text}
            size={40}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
        /></label>
        <br />
        <button onClick={() => {
            save({ text: text, tracked: tracked })
        }} >Done</button>
        <br />
    </>
}

export default TrackEdit
