import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type ProjectsStoreState, type Project } from './types';
import { DEFAULT_PROJECTS_STORE_STATE } from './constants';
import { generateUniqueId, updateItemById, deleteItemById } from '@/stores/shared/store-utils';

// Zustand custom hooks
export const useProjectsStore = create(
    immer<ProjectsStoreState>(set => ({
        ...DEFAULT_PROJECTS_STORE_STATE,

        /* Actions */
        addProject: (project: Project) => {
            set(state => {
                const newProject: Project = {
                    ...project,
                    id: generateUniqueId('project'),
                };
                state.projects.unshift(newProject);
            });
        },

        updateProject: (id: string, updates: Partial<Omit<Project, 'id'>>) => {
            set(state => {
                state.projects = updateItemById(state.projects, id, updates);
            });
        },

        deleteProject: (id: string) => {
            set(state => {
                state.projects = deleteItemById(state.projects, id);
            });
        },

        resetProjects: () => {
            set(state => {
                Object.assign(state, DEFAULT_PROJECTS_STORE_STATE);
            });
        },
    }))
);