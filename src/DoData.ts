
export interface ToDoData {
    text: string
    done: number 
}

export interface DoNextData {
    todos: ToDoData[]
}

export interface EventData {
    text: string
    start: number 
    duration: number
}

export interface DoEventsData {
    events: EventData[]
}


