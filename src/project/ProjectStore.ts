import { Project, ProjectSet } from "../DoData";

export const projectStore = (
    project: Project,
    allProjects: ProjectSet,
    setStore: (data: ProjectSet) => void
) => {
    if (project.text.length === 0) {
        return
    }

    const existingProject = allProjects.projects.find(item => item.text === project.text)
    if (existingProject === undefined) {
        allProjects.projects.push(project)
    }
    else {
        existingProject.minutes = project.minutes
    }

    setStore(allProjects)
}
