import { type TechStackStoreState } from './types';

// Techstack constants
// Default state constant
export const INITIAL_TECH_DATA = 
[
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
]


export const DEFAULT_TECH_STACK_STORE_STATE: TechStackStoreState = 
{
    technologies: INITIAL_TECH_DATA, // Call the state constant
    visibleCount: 4, 
    isModalOpen: false,
};