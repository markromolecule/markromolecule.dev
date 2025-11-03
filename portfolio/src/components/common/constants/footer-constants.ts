import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/markromolecule",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/mark-joseph-livado-01945b331/",
        icon: Linkedin,
    },
    {
        name: "Instagram",
        href: "https://instagram.com/josephcstro_",
        icon: Instagram,
    },
    {
        name: "Email",
        href: "mailto:livadomc@gmail.com",
        icon: Mail,
    },
] as const;
