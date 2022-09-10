import React from "react"
import useLocalStorageState from 'use-local-storage-state'
import { defaultData } from "./App"
import checker from "./Checker"
import { ToDoData } from "./DoData"

export interface ToDoProps {
    todo: ToDoData
}

const ToDo = ({ todo }: ToDoProps) => {
    const [localStorage, setLocalStorage] = useLocalStorageState('donext', {
        defaultValue: defaultData
    })

    return <li >
        <input
            type="checkbox"
            onClick={(event) => { checker(todo, localStorage, setLocalStorage) }}
        />
        {todo.text}
    </li>
}

export default ToDo