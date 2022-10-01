import React, { useEffect, useState } from 'react'
import './DoNext.css'
import RepeatingDos from './todo/RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './event/Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { MinuteMilliseconds, TodoStorageKey } from './Constants'
import Projects from './project/Projects'
import Notes from './Notes'
import Tracks from './track/Tracks'
import Tasks from './task/Tasks'
import Analyze from './analyze/Analyze'

function App() {
  const [, setStateToForceRerender] = useState(new Date())
  const [todoStorage] = useLocalStorageState(TodoStorageKey, {
    defaultValue: defaultToDoData
  })

  useEffect(() => {
    setInterval(() => {
      setStateToForceRerender(new Date())
    }, MinuteMilliseconds)
  }, [])

  return <>
    <div className="App">
      <Analyze />
      <Tasks />
      <Tracks />
      <Events />
      <RepeatingDos data={todoStorage.todos} />
      <Storage />
      <Notes />
      <Projects />
    </div>
  </>
}

export default App
