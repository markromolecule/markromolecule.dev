// TODO: Constant for

import type { ProjectsStoreState } from "@/stores/project/types";

export const DEFAULT_PROJECTS_STORE_STATE: ProjectsStoreState = {
    projects: [
        {
            id: "1",
            title: "LakbAI",
            description: "The project aims to modernize traditional jeepney transportation through a QR code–based checkpoint and fare system, enhanced with AI features for route prediction and fare optimization. Features include user authentication, QR code scanning, and payment integration.",
            technologies: ['React Native', 'Laravel', 'MySQL', 'Xendit'],
            github: 'https://github.com/markromolecule/LakbAI',
            demo: 'https://lakb-ai-two.vercel.app',
        },
        {
            id: "2",
            title: "Nexus",
            description: 'This activity is a collaborative project where we work as a team to design and develop a simple gaming platform landing page. Each member is responsible for creating a uniquely styled landing page, while following a shared structure and design guidelines to ensure consistency and teamwork.',
            technologies: ['React', 'Tailwind CSS', 'JavaScript'],
            github: 'https://github.com/markromolecule/Nexus',
            demo: 'https://nexus-phi-three.vercel.app',
        },
    ],
};