// Import shared types
import { type BaseEntity, 
         type VisibilityEntity, 
         type OrderedEntity, 
         type ModalState 
} from '../shared/store-types';

// Define the technology type
export type Technology = 
{
  id: string;
  name: string;
  category: string;
  isVisible: boolean;
  order: number;
} & BaseEntity & VisibilityEntity & OrderedEntity;

// Define the state type
export type TechStackStoreState = 
{
  technologies: Technology[];
  visibleCount: number;
  isModalOpen: boolean;
} & ModalState;

// Define the actions type
export type TechStackStoreActions = 
{
  addTechnology: (technology: Omit<Technology, 'id' | 'order'>) => void;
  updateTechnology: (id: string, updates: Partial<Omit<Technology, 'id'>>) => void;
  deleteTechnology: (id: string) => void;
  toggleVisibility: (id: string) => void;
  reorderTechnologies: (fromIndex: number, toIndex: number) => void;
  setVisibleCount: (count: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  resetTechnologies: () => void;
};

export type TechStackStore = TechStackStoreState & TechStackStoreActions;