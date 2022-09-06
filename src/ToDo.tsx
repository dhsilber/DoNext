import React from "react"
import { DoNextData, ToDoData } from "./DoData"

export interface ToDoProps {
    todo: ToDoData
    checker: (
        // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
        item: ToDoData,
        data: ToDoData[],
        store: (data: DoNextData) => void
    ) => void
    data: ToDoData[]
    store: (data: DoNextData) => void
}

const ToDo = ({ todo, checker, data, store }: ToDoProps) => {
    return <li >
        <input
            type="checkbox"
            onClick={(event) => { checker(todo, data, store) }}
        />
        {todo.text}
    </li>
}

export default ToDo