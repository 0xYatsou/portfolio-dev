"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Animated gradient background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left side - Text content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-violet-400 font-medium mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            👋 Bienvenue sur mon portfolio
                        </motion.p>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Construire le{" "}
                            <span className="gradient-text">web de demain</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            Développeur Full-Stack passionné par la création d&apos;expériences
                            web exceptionnelles. Je transforme des idées en applications
                            modernes, performantes et élégantes.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <motion.a
                            href="#contact"
                            className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Me contacter
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 glass rounded-xl font-semibold flex items-center gap-2 glow-hover"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-3 gap-6 pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {[
                            { value: "5+", label: "Années d'exp" },
                            { value: "50+", label: "Projets" },
                            { value: "100%", label: "Satisfaction" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                            >
                                <div className="text-3xl font-bold gradient-text">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right side - Visual element */}
                <motion.div
                    className="relative hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="relative w-full aspect-square">
                        {/* Floating code blocks */}
                        {[
                            { top: "10%", left: "10%", delay: 0 },
                            { top: "50%", right: "10%", delay: 0.2 },
                            { bottom: "10%", left: "20%", delay: 0.4 },
                        ].map((pos, index) => (
                            <motion.div
                                key={index}
                                className="absolute glass p-4 rounded-lg glow"
                                style={pos}
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 3 + index,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: pos.delay,
                                }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-violet-500/30 rounded w-20" />
                                    <div className="h-2 bg-blue-500/30 rounded w-16" />
                                </div>
                            </motion.div>
                        ))}

                        {/* Central glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-64 h-64 bg-gradient-to-br from-violet-500/30 to-blue-500/30 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
