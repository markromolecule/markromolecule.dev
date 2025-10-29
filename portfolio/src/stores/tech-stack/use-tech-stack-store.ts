import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type TechStackStore, type Technology } from './types';
import { DEFAULT_TECH_STACK_STORE_STATE } from './constants';
import { 
  generateUniqueId, 
  updateItemById, 
  deleteItemById, 
  reorderArray,
  updateOrdersAfterDelete,
  updateOrdersAfterReorder 
} from '../shared/store-utils';

export const useTechStackStore = create(
  immer<TechStackStore>(set => ({
    ...DEFAULT_TECH_STACK_STORE_STATE,

    /* Actions */
    addTechnology: (technology) => {
      set(state => {
        const newTechnology: Technology = {
          ...technology,
          id: generateUniqueId('tech'),
          isVisible: true,
          order: state.technologies.length + 1,
        };
        state.technologies.push(newTechnology);
      });
    },

    updateTechnology: (id, updates) => {
      set(state => {
        state.technologies = updateItemById(state.technologies, id, updates);
      });
    },

    deleteTechnology: (id) => {
      set(state => {
        state.technologies = updateOrdersAfterDelete(
          deleteItemById(state.technologies, id)
        );
      });
    },

    toggleVisibility: (id) => {
      set(state => {
        const tech = state.technologies.find(t => t.id === id);
        if (tech) {
          tech.isVisible = !tech.isVisible;
        }
      });
    },

    reorderTechnologies: (fromIndex, toIndex) => {
      set(state => {
        const reordered = reorderArray(state.technologies, fromIndex, toIndex);
        state.technologies = updateOrdersAfterReorder(reordered);
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
        Object.assign(state, DEFAULT_TECH_STACK_STORE_STATE);
      });
    },
  }))
);