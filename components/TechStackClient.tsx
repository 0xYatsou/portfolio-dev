"use client";

import { motion } from "framer-motion";

interface Technology {
    id: string;
    name: string;
    category: string;
    icon_url: string | null;
    order_index: number;
}

interface TechStackClientProps {
    technologies: Technology[];
}

export default function TechStackClient({ technologies }: TechStackClientProps) {
    // Calculer les stats dynamiquement
    const stats = [
        { value: `${technologies.length}+`, label: "Technologies", color: "violet" },
        {
            value: `${technologies.filter(t => t.category.toLowerCase().includes('framework')).length}+`,
            label: "Frameworks",
            color: "blue"
        },
        {
            value: `${technologies.filter(t => t.category.toLowerCase().includes('language') || t.category.toLowerCase().includes('langage')).length}+`,
            label: "Langages",
            color: "purple"
        },
        { value: "∞", label: "Apprentissage", color: "indigo" },
    ];

    return (
        <section id="stack" className="py-32 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

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
                        Stack <span className="gradient-text">Technique</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Technologies et outils que je maîtrise pour créer des applications
                        performantes
                    </p>
                </motion.div>

                {technologies.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">
                            Aucune technologie disponible pour le moment.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Infinite Marquee */}
                        <div className="relative">
                            {/* Top Row - Moving Right */}
                            <div className="overflow-hidden mb-6">
                                <motion.div
                                    className="flex gap-6"
                                    animate={{
                                        x: [0, -1920],
                                    }}
                                    transition={{
                                        x: {
                                            duration: 30,
                                            repeat: Infinity,
                                            ease: "linear",
                                        },
                                    }}
                                >
                                    {[...technologies, ...technologies, ...technologies].map(
                                        (tech, index) => (
                                            <div
                                                key={`top-${index}`}
                                                className="flex-shrink-0 glass px-8 py-4 rounded-xl glow-hover min-w-[200px]"
                                            >
                                                <div className="text-lg font-semibold text-white">
                                                    {tech.name}
                                                </div>
                                                <div className="text-sm text-violet-400">{tech.category}</div>
                                            </div>
                                        )
                                    )}
                                </motion.div>
                            </div>

                            {/* Bottom Row - Moving Left */}
                            <div className="overflow-hidden">
                                <motion.div
                                    className="flex gap-6"
                                    animate={{
                                        x: [-1920, 0],
                                    }}
                                    transition={{
                                        x: {
                                            duration: 30,
                                            repeat: Infinity,
                                            ease: "linear",
                                        },
                                    }}
                                >
                                    {[...technologies, ...technologies, ...technologies].map(
                                        (tech, index) => (
                                            <div
                                                key={`bottom-${index}`}
                                                className="flex-shrink-0 glass px-8 py-4 rounded-xl glow-hover min-w-[200px]"
                                            >
                                                <div className="text-lg font-semibold text-white">
                                                    {tech.name}
                                                </div>
                                                <div className="text-sm text-blue-400">{tech.category}</div>
                                            </div>
                                        )
                                    )}
                                </motion.div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <motion.div
                            className="grid md:grid-cols-4 gap-6 mt-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="glass p-6 rounded-2xl text-center glow-hover"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className={`text-4xl font-bold gradient-text mb-2`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}
