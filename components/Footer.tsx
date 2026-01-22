"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com",
        color: "hover:text-violet-400",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://linkedin.com",
        color: "hover:text-blue-400",
    },
    {
        name: "Twitter",
        icon: Twitter,
        href: "https://twitter.com",
        color: "hover:text-sky-400",
    },
    {
        name: "Email",
        icon: Mail,
        href: "mailto:geoffrey.vivien@gmail.com",
        color: "hover:text-purple-400",
    },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative py-20 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Contact Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Travaillons <span className="gradient-text">Ensemble</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                        Un projet en tête ? Discutons de la façon dont je peux vous aider à
                        le concrétiser.
                    </p>

                    <motion.button
                        onClick={() => {
                            navigator.clipboard.writeText("geoffrey.vivien@gmail.com");
                            alert("Email copié dans le presse-papier !");
                            window.location.href = "mailto:geoffrey.vivien@gmail.com";
                        }}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail className="w-6 h-6" />
                        Me contacter
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="flex justify-center gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 glass rounded-xl glow-hover transition-colors ${social.color}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={social.name}
                        >
                            <social.icon className="w-6 h-6" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

                {/* Footer Bottom */}
                <motion.div
                    className="text-center text-slate-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="flex items-center justify-center gap-2 mb-2">
                        Créé avec <Heart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
                        et Next.js
                    </p>
                    <p className="text-sm">
                        © {new Date().getFullYear()} DevPortfolio. Tous droits réservés.
                    </p>
                </motion.div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        </footer>
    );
}
