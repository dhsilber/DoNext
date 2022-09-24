
export interface Todo {
    text: string
    done: number
    days: number[]
}

export interface TodoSet {
    todos: Todo[]
}

export interface Event {
    text: string
    start: number 
    duration: number
}

export interface Routine {
    text: string
    start: number 
    duration: number
}

export interface EventSet {
    routine: Routine[]
    events: Event[]
}

export interface Project {
    text: string
    beginning: number
    minutes: number
}

export interface ProjectSet {
    projects: Project[]
}

export interface Track {
    text: string
    tracked: number[]
}

export interface TrackSet {
    tracks: Track[]
}


