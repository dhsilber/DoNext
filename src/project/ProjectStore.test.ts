import { Project, ProjectSet } from "../DoData"
import { projectStore } from "./ProjectStore"

test('stores a new project', () => {
    const mockStore = jest.fn()
    const initialProjectSet: ProjectSet = {
        projects: []
    }
    const project: Project = {
        text: 'new project',
        beginning: 123,
        minutes: 0,
    }
    const expectedProjectSet: ProjectSet = {
        projects: [project]
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedProjectSet)
})

test('does not store a project with an empty name', () => {
    const mockStore = jest.fn()
    const initialProjectSet: ProjectSet = {
        projects: []
    }
    const project: Project = {
        text: '',
        beginning: 123,
        minutes: 0,
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).not.toHaveBeenCalled()
})

test('updates an existing project', () => {
    const mockStore = jest.fn()
    const initialProjectSet: ProjectSet = {
        projects: [{ text: 'project', beginning: 123, minutes:0 }]
    }
    const project: Project = {
        text: 'project',
        beginning: 123,
        minutes: 15,
    }
    const expectedProjectSet: ProjectSet = {
        projects: [project]
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedProjectSet)
})
