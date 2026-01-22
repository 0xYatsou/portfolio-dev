"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
    {
        year: "2023 - Présent",
        title: "Lead Developer",
        company: "Tech Startup",
        description:
            "Direction technique et développement d'applications web modernes",
        icon: Briefcase,
    },
    {
        year: "2021 - 2023",
        title: "Full-Stack Developer",
        company: "Digital Agency",
        description: "Développement de solutions e-commerce et SaaS",
        icon: Briefcase,
    },
    {
        year: "2019 - 2021",
        title: "Frontend Developer",
        company: "Creative Studio",
        description: "Création d'interfaces utilisateur innovantes",
        icon: Briefcase,
    },
    {
        year: "2016 - 2019",
        title: "Master Informatique",
        company: "Université",
        description: "Spécialisation en développement web et mobile",
        icon: GraduationCap,
    },
];

export default function CVSection() {
    return (
        <section id="cv" className="py-32 px-6 relative">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Mon <span className="gradient-text">Parcours</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                        Une trajectoire marquée par l&apos;innovation et l&apos;excellence technique
                    </p>

                    {/* Download CV Button */}
                    <motion.a
                        href="/cv.pdf"
                        download
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        Télécharger mon CV
                    </motion.a>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-purple-500" />

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                {/* Content */}
                                <div
                                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                                        } ml-12 md:ml-0`}
                                >
                                    <motion.div
                                        className="glass p-6 rounded-2xl glow-hover"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="text-violet-400 font-semibold mb-2">
                                            {exp.year}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                                        <div className="text-blue-400 font-medium mb-3">
                                            {exp.company}
                                        </div>
                                        <p className="text-slate-400">{exp.description}</p>
                                    </motion.div>
                                </div>

                                {/* Center dot with icon */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 glass rounded-full flex items-center justify-center glow z-10">
                                    <exp.icon className="w-7 h-7 text-violet-400" />
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block w-5/12" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
