import React from 'react'
import './App.css'
import RepeatingDos from './RepeatingDos'
import LoadData from './LoadData'
import { DoNextData } from './DoData'
import useLocalStorageState from 'use-local-storage-state'
import UnloadData from './UnloadData'
import dayStartMilliseconds from './DayStartMillisocnds'

export const defaultData: DoNextData = {
  todos: [
    { text: "Download default configuration", done: 0 },
    { text: "Edit to make it yours", done: 0 },
    { text: "Ingest your data", done: 0 },
  ]
}

function App() {
  // const [data, setData] = useState<ToDo[]>([])
  const [localStorage, setLocalStorage] = useLocalStorageState('donext', {
    defaultValue: defaultData
  })

  const persistData = (data: DoNextData) => {
    // setData(data)
    setLocalStorage(data)
  }

  return (
    <div className="App">
      <RepeatingDos data={localStorage.todos} />
      <LoadData setData={persistData} />
      <UnloadData data={localStorage} />
    </div>
  )
}

export default App
