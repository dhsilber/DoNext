import React from 'react'
import './App.css'
import RepeatingDos from './RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { TodoStorageKey } from './Constants'
import Notes from './Notes'

function App() {
  // const [data, setData] = useState<ToDo[]>([])
  const [todoStorage] = useLocalStorageState(TodoStorageKey, {
    defaultValue: defaultToDoData
  })

  return (
    <div className="App">
      <RepeatingDos data={todoStorage.todos} />
      <div>-----------------------------------------------------------------------</div>
      <Events />
      <div>-----------------------------------------------------------------------</div>
      <Notes />
      <div>-----------------------------------------------------------------------</div>
      <Storage />
    </div>
  )
}

export default App
