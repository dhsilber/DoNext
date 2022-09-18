import { render, screen } from "@testing-library/react"
import { Project, ProjectSet } from "../DoData"
import ProjectList from "./ProjectList"

test('shows list of projects', () => {
    const mockTally = jest.fn((project: Project) => { })
    const projectSet: ProjectSet = {
        projects: [
            { text: 'project name', beginning: 123, minutes: 0, },
            { text: 'other project', beginning: 124, minutes: 0, },
        ]
    }
    render(<ProjectList projectSet={projectSet} tally={mockTally} />)

    expect(screen.getByText('project name')).toBeInTheDocument()
    expect(screen.getByText('other project')).toBeInTheDocument()
})

test('each project has a checkbox', () => {
    const mockTally = jest.fn((project: Project) => { })
    const projectSet: ProjectSet = {
        projects: [
            { text: 'project name', beginning: 123, minutes: 0, },
            { text: 'other project', beginning: 124, minutes: 0, },
        ]
    }
    render(<ProjectList projectSet={projectSet} tally={mockTally} />)

    expect(screen.getByRole('checkbox', { name: 'project name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'other project' })).toBeInTheDocument()
})

test('each project shows accumulated time and start date', () => {
    const mockTally = jest.fn((project: Project) => { })
    const projectSet: ProjectSet = {
        projects: [
            {
                text: 'project name',
                beginning: 1663511820000,
                minutes: 0,
            },
        ]
    }
    render(<ProjectList projectSet={projectSet} tally={mockTally} />)

    expect(screen.getByText('project name')).toBeInTheDocument()
    expect(screen.getByText('0 minutes since 2022-09-18')).toBeInTheDocument()
})
