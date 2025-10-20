import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the technology type
export type Technology = {
  id: string;
  name: string;
  category: string;
  isVisible: boolean;
  order: number;
};

// Define the state type
export type TechStackStoreState = {
  technologies: Technology[];
  visibleCount: number;
  isModalOpen: boolean;
};

// Define the actions type
export type TechStackStoreActions = {
  addTechnology: (technology: Omit<Technology, 'id' | 'order'>) => void;
  updateTechnology: (id: string, updates: Partial<Omit<Technology, 'id'>>) => void;
  deleteTechnology: (id: string) => void;
  toggleVisibility: (id: string) => void;
  reorderTechnologies: (fromIndex: number, toIndex: number) => void;
  setVisibleCount: (count: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  resetTechnologies: () => void;
};

// Default state constant
export const DEFAULT_TECH_STACK_STORE_STATE: TechStackStoreState = {
  technologies: [
    { id: '1', name: 'Next.js', category: 'Frameworks', isVisible: true, order: 1 },
    { id: '2', name: 'Laravel', category: 'Frameworks', isVisible: true, order: 2 },
    { id: '3', name: 'React', category: 'Frontend', isVisible: true, order: 3 },
    { id: '4', name: 'JavaScript', category: 'Frontend', isVisible: true, order: 4 },
    { id: '5', name: 'TypeScript', category: 'Frontend', isVisible: true, order: 5 },
    { id: '6', name: 'Tailwind CSS', category: 'Frontend', isVisible: true, order: 6 },
    { id: '7', name: 'Bootstrap', category: 'Frontend', isVisible: true, order: 7 },
    { id: '8', name: 'React Native', category: 'Mobile', isVisible: true, order: 8 },
    { id: '9', name: 'Kotlin', category: 'Mobile', isVisible: true, order: 9 },
    { id: '10', name: 'PHP', category: 'Backend', isVisible: true, order: 10 },
    { id: '11', name: 'Express.js', category: 'Backend', isVisible: true, order: 11 },
    { id: '12', name: 'PostgreSQL', category: 'Database', isVisible: true, order: 12 },
    { id: '13', name: 'MySQL', category: 'Database', isVisible: true, order: 13 },
    { id: '14', name: 'Git', category: 'Version Control', isVisible: true, order: 14 },
    { id: '15', name: 'Visual Studio Code', category: 'Development Tools', isVisible: true, order: 15 },
    { id: '16', name: 'Postman', category: 'Development Tools', isVisible: true, order: 16 },
  ],
  visibleCount: 4,
  isModalOpen: false,
};

// Combined store type
export type TechStackStore = TechStackStoreState & TechStackStoreActions;

// Create and export the store hook
export const useTechStackStore = create(
  immer<TechStackStore>(set => ({
    ...DEFAULT_TECH_STACK_STORE_STATE,

    /* Actions */
    addTechnology: (technology) => {
      set(state => {
        const newTechnology: Technology = {
          ...technology,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          order: state.technologies.length + 1,
        };
        state.technologies.push(newTechnology);
      });
    },

    updateTechnology: (id, updates) => {
      set(state => {
        const index = state.technologies.findIndex(tech => tech.id === id);
        if (index !== -1) {
          Object.assign(state.technologies[index], updates);
        }
      });
    },

    deleteTechnology: (id) => {
      set(state => {
        state.technologies = state.technologies.filter(tech => tech.id !== id);
        // Reorder remaining technologies
        state.technologies.forEach((tech, index) => {
          tech.order = index + 1;
        });
      });
    },

    toggleVisibility: (id) => {
      set(state => {
        const index = state.technologies.findIndex(tech => tech.id === id);
        if (index !== -1) {
          state.technologies[index].isVisible = !state.technologies[index].isVisible;
        }
      });
    },

    reorderTechnologies: (fromIndex, toIndex) => {
      set(state => {
        const technologies = [...state.technologies];
        const [movedTech] = technologies.splice(fromIndex, 1);
        technologies.splice(toIndex, 0, movedTech);
        
        // Update order for all technologies
        technologies.forEach((tech, index) => {
          tech.order = index + 1;
        });
        
        state.technologies = technologies;
      });
    },

    setVisibleCount: (count) => {
      set(state => {
        state.visibleCount = count;
      });
    },

    setIsModalOpen: (isOpen) => {
      set(state => {
        state.isModalOpen = isOpen;
      });
    },

    resetTechnologies: () => {
      set(state => {
        state.technologies = [...DEFAULT_TECH_STACK_STORE_STATE.technologies];
        state.visibleCount = DEFAULT_TECH_STACK_STORE_STATE.visibleCount;
        state.isModalOpen = DEFAULT_TECH_STACK_STORE_STATE.isModalOpen;
      });
    },
  }))
);
