// Types from @use-project-store

// Define the project type
export type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    github: string;
    demo: string;
};

// Define the state type
export type ProjectsStoreState = {
    projects: Project[];
};

export type ProjectsStoreActions = {
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => void;
    deleteProject: (id: string) => void;
    resetProject: () => void;
}