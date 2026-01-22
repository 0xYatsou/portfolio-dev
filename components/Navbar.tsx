"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Navbar() {
    const navItems = [
        { name: "Accueil", href: "#hero" },
        { name: "Projets", href: "#projects" },
        { name: "Stack", href: "#stack" },
        { name: "Parcours", href: "#cv" },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 glow-hover">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        className="flex items-center gap-2 text-xl font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Code2 className="w-6 h-6 text-violet-400" />
                        <span className="gradient-text">DevPortfolio</span>
                    </motion.a>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-slate-300 hover:text-white transition-colors relative group"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        className="hidden md:block px-6 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
