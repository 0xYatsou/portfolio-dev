"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Prevent multiple submissions
        if (status === "loading") return;

        setStatus("loading");

        try {
            console.log("Submitting form data:", formData);
            const { data, error } = await supabase.from("messages").insert([formData]);

            console.log("Supabase response:", { data, error });

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            console.log("Message sent successfully!");
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 8000);
        } catch (error: any) {
            console.error("Error sending message:", error);
            console.error("Error details:", error.message, error.code);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }

        return false; // Extra safety to prevent form submission
    };

    if (isMobile) {
        return (
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    Prêt à démarrer un projet ? Appuyez sur le bouton ci-dessous pour m&apos;envoyer un email directement depuis votre téléphone.
                </p>
                <motion.a
                    href="mailto:geoffrey.vivien@gmail.com"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Mail className="w-6 h-6" />
                    M&apos;envoyer un Email
                </motion.a>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <motion.form
                onSubmit={handleSubmit}
                className="glass p-8 rounded-3xl space-y-6 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <User className="w-4 h-4 text-violet-400" /> Nom complet
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 transition-colors text-white"
                            placeholder="Jean Dupont"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400" /> Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white"
                            placeholder="jean@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-400" /> Sujet
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 transition-colors text-white"
                        placeholder="Collaboration sur un projet..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-pink-400" /> Message
                    </label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 transition-colors text-white resize-none"
                        placeholder="Dites-m'en plus sur votre projet..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {status === "loading" ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            Envoyer le message
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>

                {/* Success Modal */}
                <AnimatePresence mode="wait">
                    {status === "success" && (
                        <motion.div
                            key="success-modal"
                            className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center text-center p-6 z-50 rounded-3xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-4">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                                <h3 className="text-2xl font-bold">Message envoyé !</h3>
                                <p className="text-slate-400">
                                    Merci pour votre message. Je vous recontacterai très prochainement.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="px-6 py-2 glass rounded-full hover:bg-slate-800 transition-colors"
                                >
                                    Fermer
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {status === "error" && (
                        <motion.div
                            className="absolute bottom-4 left-4 right-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <AlertCircle className="w-5 h-5" />
                            Une erreur est survenue. Veuillez réessayer.
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>
        </div>
    );
}
