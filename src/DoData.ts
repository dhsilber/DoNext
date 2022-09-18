
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

export interface Routine {
    text: string
    start: number 
    duration: number
}

export interface DoEventsData {
    routine: Routine[]
    events: EventData[]
}

export interface Project {
    text: string
    beginning: number
    minutes: number
}

export interface ProjectSet {
    projects: Project[]
}


