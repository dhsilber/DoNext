import React, { useEffect, useState } from 'react'
import './App.css'
import RepeatingDos from './RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { TodoStorageKey } from './Constants'

function App() {
  const [, setStateToForceRerender] = useState(new Date())
  const [todoStorage] = useLocalStorageState(TodoStorageKey, {
    defaultValue: defaultToDoData
  })

  useEffect(() => {
    setInterval(() => {
      setStateToForceRerender(new Date())
    }, 10 * 60 * 1000)
  }, [])

  return (
    <div className="App">
      <RepeatingDos data={todoStorage.todos} />
      <div>-----------------------------------------------------------------------</div>
      <Events />
      <div>-----------------------------------------------------------------------</div>

      <div>-----------------------------------------------------------------------</div>
      <Storage />
    </div>
  )
}

export default App
