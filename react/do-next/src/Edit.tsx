import { useEffect, useState } from 'react'
import './DoNext.css'
import RepeatingDos from './todo/RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './event/Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { MinuteMilliseconds, TodoStorageKey } from './Constants'
import Projects from './project/Projects'
import Tracks from './track/Tracks'
import Tasks from './task/Tasks'
import Analyze from './analyze/Analyze'

function Edit() {
  return <>
    <p>Nothing here</p>
  </>
}

export default Edit
