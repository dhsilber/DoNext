import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { TrackStorageKey } from '../Constants'
import { Track } from '../DoData'
import { defaultTrackData } from '../storage/Storage'
import TrackEdit from './TrackEdit'
import TrackList from './TrackList'
import { trackStore } from './TrackStore'

const emptyTrack: Track = {
    text: '',
    tracked: [],
}

const Tracks = () => {
    const [trackStorage, setTrackStorage] = useLocalStorageState(TrackStorageKey, {
        defaultValue: defaultTrackData
    })
    const [edit, setEdit] = useState(false)

    const save = (track: Track) => {
        setEdit(false)
        trackStore(track, trackStorage, setTrackStorage)
    }

    const tracker = (track: Track) => {
        trackStore(track, trackStorage, setTrackStorage)
    }

    return <div className='track'>
        <b>Track:</b>
        <TrackList trackSet={trackStorage} tracker={tracker} />
        {edit && <TrackEdit track={emptyTrack} save={save} />}
        {/* {edit && <TrackEdit project={emptyTrack} save={save} />} */}
        <button onClick={() => setEdit(true)} >+</button>
    </div>
}

export default Tracks
