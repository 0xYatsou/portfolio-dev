"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    tags: string[];
    github_url: string | null;
    live_url: string | null;
    order_index: number;
    span: string;
}

interface BentoGridClientProps {
    projects: Project[];
}

export default function BentoGridClient({ projects }: BentoGridClientProps) {
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
                    {projects.length === 0 ? (
                        <div className="col-span-3 text-center py-20">
                            <p className="text-slate-400 text-lg">
                                Aucun projet disponible pour le moment.
                            </p>
                        </div>
                    ) : (
                        projects.map((project, index) => (
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
                                    {project.image_url ? (
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <>
                                            {/* Placeholder gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20" />
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-blue-500/30"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </>
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        {project.github_url && (
                                            <motion.a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Github className="w-6 h-6" />
                                            </motion.a>
                                        )}
                                        {project.live_url && (
                                            <motion.a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <ExternalLink className="w-6 h-6" />
                                            </motion.a>
                                        )}
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
                                        {project.tags && project.tags.map((tag) => (
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
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
