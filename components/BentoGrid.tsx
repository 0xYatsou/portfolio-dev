"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Plateforme e-commerce moderne avec paiement intégré",
        image: "/project1.jpg",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-2",
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Tableau de bord temps réel avec visualisations",
        image: "/project2.jpg",
        tags: ["React", "D3.js", "Node.js"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-1",
    },
    {
        id: 3,
        title: "App Mobile Fitness",
        description: "Application de suivi fitness et nutrition",
        image: "/project3.jpg",
        tags: ["React Native", "Firebase"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-1",
    },
    {
        id: 4,
        title: "SaaS Marketing",
        description: "Outil d'automatisation marketing multi-canal",
        image: "/project4.jpg",
        tags: ["Vue.js", "Python", "Redis"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-2",
    },
    {
        id: 5,
        title: "Portfolio 3D",
        description: "Portfolio interactif avec Three.js",
        image: "/project5.jpg",
        tags: ["Three.js", "WebGL", "GSAP"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-1",
    },
    {
        id: 6,
        title: "Chat AI Assistant",
        description: "Assistant conversationnel avec IA générative",
        image: "/project6.jpg",
        tags: ["OpenAI", "TypeScript", "Tailwind"],
        github: "https://github.com",
        live: "https://example.com",
        span: "md:col-span-1",
    },
];

export default function BentoGrid() {
    return (
        <section id="projects" className="py-32 px-6 relative">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Projets <span className="gradient-text">Récents</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Une sélection de mes meilleurs travaux, alliant design moderne et
                        performance technique
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`group relative glass rounded-2xl overflow-hidden glow-hover ${project.span}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            {/* Project Image */}
                            <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                                {/* Placeholder gradient - replace with actual images */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-blue-500/30"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Github className="w-6 h-6" />
                                    </motion.a>
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ExternalLink className="w-6 h-6" />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 mb-4">{project.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
