import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { ProjectStorageKey } from '../Constants'
import { Project } from '../DoData'
import { defaultProjectData } from '../storage/Storage'
import ProjectEdit from './ProjectEdit'
import ProjectList from './ProjectList'
import { projectStore } from './ProjectStore'

const emptyProject: Project = {
    text: '',
    beginning: 0,
    minutes: 0,
}

const Projects = () => {
    const [projectStorage, setProjectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })
    const [edit, setEdit] = useState(false)

    const save = (project: Project) => {
        setEdit(false)
        projectStore(project, projectStorage, setProjectStorage)
    }

    const tallyMinutes = (project: Project) => {
        project.minutes += 15
        projectStore(project, projectStorage, setProjectStorage)
    }

    const orderedProjects = projectStorage
        .projects.sort((a, b) => { if (b.minutes > a.minutes) { return -1 } else { return 1 } })

    return <div className='projects'>
        <ProjectList projectSet={{ projects: orderedProjects }} tally={tallyMinutes} />
        {edit && <ProjectEdit project={emptyProject} save={save} />}
        <button onClick={() => setEdit(true)} >+</button>
        <button onClick={() => setEdit(true)} >foo</button>
    </div>
}

export default Projects
