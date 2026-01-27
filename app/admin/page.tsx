"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    Briefcase,
    Code2,
    Eye,
    LogOut,
    Mail,
    Pencil,
    Plus,
    Save,
    Trash2,
    Users,
    X,
    Upload,
    Loader2
} from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    github_url: string;
    live_url: string;
    image_url: string;
    span: string;
    order_index: number;
}

interface Technology {
    id: string;
    name: string;
    category: string;
    order_index: number;
}

interface Experience {
    id: string;
    year: string;
    title: string;
    company: string;
    description: string;
    icon_type: string;
    order_index: number;
}

interface Analytics {
    total_views: number;
    unique_visitors: number;
    recent_views: Array<{
        page_path: string;
        created_at: string;
    }>;
}

type ModalMode = "add" | "edit" | null;

export default function AdminPage() {
    const { user, loading: authLoading, signOut } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"projects" | "tech" | "cv" | "analytics" | "messages">("analytics");
    const [projects, setProjects] = useState<Project[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<Analytics>({
        total_views: 0,
        unique_visitors: 0,
        recent_views: [],
    });
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Modal states
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ table: string; id: string } | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [activeTab, user]);

    async function loadData() {
        setLoading(true);
        try {
            if (activeTab === "projects") {
                const { data } = await supabase
                    .from("projects")
                    .select("*")
                    .order("order_index");
                setProjects(data || []);
            } else if (activeTab === "tech") {
                const { data } = await supabase
                    .from("technologies")
                    .select("*")
                    .order("order_index");
                setTechnologies(data || []);
            } else if (activeTab === "cv") {
                const { data } = await supabase
                    .from("experiences")
                    .select("*")
                    .order("order_index");
                setExperiences(data || []);
            } else if (activeTab === "messages") {
                const { data } = await supabase
                    .from("messages")
                    .select("*")
                    .order("created_at", { ascending: false });
                setMessages(data || []);
            } else if (activeTab === "analytics") {
                const { count: totalViews } = await supabase
                    .from("page_views")
                    .select("*", { count: "exact", head: true });

                const { data: recentViews } = await supabase
                    .from("page_views")
                    .select("page_path, created_at")
                    .order("created_at", { ascending: false })
                    .limit(10);

                setAnalytics({
                    total_views: totalViews || 0,
                    unique_visitors: 0,
                    recent_views: recentViews || [],
                });
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
        setLoading(false);
    }

    function handleDelete(table: string, id: string) {
        setDeleteConfirmation({ table, id });
    }

    async function confirmDelete() {
        if (!deleteConfirmation) return;

        try {
            const { error } = await supabase
                .from(deleteConfirmation.table)
                .delete()
                .eq("id", deleteConfirmation.id);
            if (error) throw error;
            setDeleteConfirmation(null);
            loadData();
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Erreur lors de la suppression");
            setDeleteConfirmation(null);
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `project-previews/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('portfolio')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            setEditingItem({ ...editingItem, image_url: publicUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erreur lors de l\'upload de l\'image. Assurez-vous que le bucket "portfolio" existe et est public.');
        } finally {
            setIsUploading(false);
        }
    }

    async function handleSave(table: string, data: any) {
        try {
            if (modalMode === "add") {
                const { error } = await supabase.from(table).insert([data]);
                if (error) throw error;
            } else if (modalMode === "edit") {
                const { error } = await supabase
                    .from(table)
                    .update(data)
                    .eq("id", editingItem.id);
                if (error) throw error;
            }
            setModalMode(null);
            setEditingItem(null);
            loadData();
        } catch (error) {
            console.error("Error saving:", error);
            alert("Erreur lors de la sauvegarde");
        }
    }

    function openAddModal() {
        setModalMode("add");
        if (activeTab === "projects") {
            setEditingItem({
                title: "",
                description: "",
                tags: [],
                github_url: "",
                live_url: "",
                image_url: "",
                span: "md:col-span-1",
                order_index: projects.length + 1,
            });
        } else if (activeTab === "tech") {
            setEditingItem({
                name: "",
                category: "",
                order_index: technologies.length + 1,
            });
        } else if (activeTab === "cv") {
            setEditingItem({
                year: "",
                title: "",
                company: "",
                description: "",
                icon_type: "Briefcase",
                order_index: experiences.length + 1,
            });
        }
    }

    function openEditModal(item: any) {
        setModalMode("edit");
        setEditingItem({ ...item });
    }

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white">Chargement...</div>
            </div>
        );
    }

    const tabs = [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "projects", label: "Projets", icon: Code2 },
        { id: "tech", label: "Technologies", icon: Briefcase },
        { id: "cv", label: "Expériences", icon: Users },
        { id: "messages", label: "Messages", icon: Mail },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-400">
                            Connecté en tant que {user.email}
                        </p>
                    </div>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Déconnexion
                    </button>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                                : "glass text-slate-300 hover:text-white"
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                            <p className="mt-4 text-slate-400">Chargement...</p>
                        </div>
                    ) : (
                        <>
                            {/* Analytics Tab */}
                            {activeTab === "analytics" && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Statistiques de visite
                                    </h2>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        <motion.div
                                            className="glass p-6 rounded-xl"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-violet-500/20 rounded-lg">
                                                    <Eye className="w-6 h-6 text-violet-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-sm">Vues totales</p>
                                                    <p className="text-3xl font-bold">
                                                        {analytics.total_views}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="glass p-6 rounded-xl"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                                    <Users className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-sm">
                                                        Visiteurs uniques
                                                    </p>
                                                    <p className="text-3xl font-bold">
                                                        {analytics.unique_visitors}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="glass p-6 rounded-xl"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-purple-500/20 rounded-lg">
                                                    <BarChart3 className="w-6 h-6 text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-sm">Vues récentes</p>
                                                    <p className="text-3xl font-bold">
                                                        {analytics.recent_views.length}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4">Visites récentes</h3>
                                        <div className="space-y-2">
                                            {analytics.recent_views.map((view, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                                                >
                                                    <span className="text-slate-300">{view.page_path}</span>
                                                    <span className="text-slate-500 text-sm">
                                                        {new Date(view.created_at).toLocaleString("fr-FR")}
                                                    </span>
                                                </div>
                                            ))}
                                            {analytics.recent_views.length === 0 && (
                                                <p className="text-slate-500 text-center py-8">
                                                    Aucune visite enregistrée pour le moment
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === "projects" && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">Projets</h2>
                                        <button
                                            onClick={openAddModal}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg hover:shadow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Ajouter
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {projects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors"
                                            >
                                                {project.image_url && (
                                                    <div className="w-16 h-10 rounded overflow-hidden border border-slate-700 flex-shrink-0">
                                                        <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg">{project.title}</h3>
                                                    <p className="text-slate-400 text-sm">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex gap-2 mt-2">
                                                        {project.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-2 py-1 text-xs bg-violet-500/20 text-violet-300 rounded"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(project)}
                                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("projects", project.id)}
                                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technologies Tab */}
                            {activeTab === "tech" && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">Technologies</h2>
                                        <button
                                            onClick={openAddModal}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg hover:shadow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Ajouter
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {technologies.map((tech) => (
                                            <div
                                                key={tech.id}
                                                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors"
                                            >
                                                <div>
                                                    <h3 className="font-bold">{tech.name}</h3>
                                                    <p className="text-slate-400 text-sm">{tech.category}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(tech)}
                                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("technologies", tech.id)}
                                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experiences Tab */}
                            {activeTab === "cv" && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">Expériences</h2>
                                        <button
                                            onClick={openAddModal}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg hover:shadow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Ajouter
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {experiences.map((exp) => (
                                            <div
                                                key={exp.id}
                                                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                                                            {exp.year}
                                                        </span>
                                                        <h3 className="font-bold text-lg">{exp.title}</h3>
                                                    </div>
                                                    <p className="text-blue-400 font-medium">{exp.company}</p>
                                                    <p className="text-slate-400 text-sm mt-1">
                                                        {exp.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(exp)}
                                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("experiences", exp.id)}
                                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages Tab */}
                            {activeTab === "messages" && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold mb-6">Messages reçus</h2>
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                className="glass p-6 rounded-2xl border border-slate-700/50"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-400 font-bold text-xl">
                                                            {msg.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-lg">{msg.name}</h3>
                                                            <p className="text-blue-400 text-sm">{msg.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-slate-500 text-xs">
                                                            {new Date(msg.created_at).toLocaleString("fr-FR")}
                                                        </p>
                                                        <button
                                                            onClick={() => handleDelete("messages", msg.id)}
                                                            className="mt-2 p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                                    <p className="text-violet-300 text-sm font-semibold mb-2 uppercase tracking-wider">
                                                        Sujet: {msg.subject}
                                                    </p>
                                                    <p className="text-slate-300 whitespace-pre-wrap">
                                                        {msg.message}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                        {messages.length === 0 && (
                                            <div className="text-center py-20 glass rounded-2xl border border-dashed border-slate-700">
                                                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                                <p className="text-slate-500">Aucun message reçu pour le moment.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {modalMode && editingItem && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalMode(null)}
                    >
                        <motion.div
                            className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold">
                                    {modalMode === "add" ? "Ajouter" : "Modifier"}{" "}
                                    {activeTab === "projects"
                                        ? "un projet"
                                        : activeTab === "tech"
                                            ? "une technologie"
                                            : "une expérience"}
                                </h3>
                                <button
                                    onClick={() => setModalMode(null)}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Project Form */}
                            {activeTab === "projects" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Titre</label>
                                        <input
                                            type="text"
                                            value={editingItem.title}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, title: e.target.value })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Tags (séparés par des virgules)
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.tags.join(", ")}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    tags: e.target.value.split(",").map((t) => t.trim()),
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                URL GitHub
                                            </label>
                                            <input
                                                type="url"
                                                value={editingItem.github_url}
                                                onChange={(e) =>
                                                    setEditingItem({
                                                        ...editingItem,
                                                        github_url: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                URL Live
                                            </label>
                                            <input
                                                type="url"
                                                value={editingItem.live_url}
                                                onChange={(e) =>
                                                    setEditingItem({
                                                        ...editingItem,
                                                        live_url: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            URL Image (Aperçu)
                                        </label>
                                        <input
                                            type="url"
                                            value={editingItem.image_url}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    image_url: e.target.value,
                                                })
                                            }
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium">Image de couverture</label>

                                        <div className="flex items-center gap-6">
                                            {editingItem.image_url ? (
                                                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-slate-700">
                                                    <img
                                                        src={editingItem.image_url}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingItem({ ...editingItem, image_url: "" })}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-32 h-20 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-xs">
                                                    Pas d'image
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id="project-image"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                    disabled={isUploading}
                                                />
                                                <label
                                                    htmlFor="project-image"
                                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isUploading ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Upload className="w-4 h-4" />
                                                    )}
                                                    {isUploading ? "Upload en cours..." : "Choisir un fichier"}
                                                </label>
                                                <p className="text-[10px] text-slate-500 mt-2">
                                                    PNG, JPG ou WEBP. Max 2Mo.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs text-slate-400 mb-1">Ou coller une URL directe</label>
                                            <input
                                                type="url"
                                                value={editingItem.image_url}
                                                onChange={(e) =>
                                                    setEditingItem({
                                                        ...editingItem,
                                                        image_url: e.target.value,
                                                    })
                                                }
                                                placeholder="https://..."
                                                className="w-full px-3 py-1.5 text-sm bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Taille (span)
                                        </label>
                                        <select
                                            value={editingItem.span}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, span: e.target.value })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="md:col-span-1">1 colonne</option>
                                            <option value="md:col-span-2">2 colonnes</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Technology Form */}
                            {activeTab === "tech" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nom</label>
                                        <input
                                            type="text"
                                            value={editingItem.name}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, name: e.target.value })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Catégorie
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.category}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Experience Form */}
                            {activeTab === "cv" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Période
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.year}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, year: e.target.value })
                                            }
                                            placeholder="2023 - Présent"
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Titre</label>
                                        <input
                                            type="text"
                                            value={editingItem.title}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, title: e.target.value })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Entreprise
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.company}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    company: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Icône</label>
                                        <select
                                            value={editingItem.icon_type}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    icon_type: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Briefcase">Briefcase (Travail)</option>
                                            <option value="GraduationCap">
                                                GraduationCap (Études)
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() =>
                                        handleSave(
                                            activeTab === "projects"
                                                ? "projects"
                                                : activeTab === "tech"
                                                    ? "technologies"
                                                    : "experiences",
                                            editingItem
                                        )
                                    }
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    <Save className="w-5 h-5" />
                                    Sauvegarder
                                </button>
                                <button
                                    onClick={() => setModalMode(null)}
                                    className="px-4 py-3 glass rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirmation && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDeleteConfirmation(null)}
                    >
                        <motion.div
                            className="glass rounded-2xl p-6 w-full max-w-md"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-500/20 rounded-full">
                                    <Trash2 className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Confirmer la suppression</h3>
                                    <p className="text-slate-400 text-sm">
                                        Cette action est irréversible
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-6">
                                Êtes-vous sûr de vouloir supprimer cet élément ?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirmation(null)}
                                    className="flex-1 px-4 py-3 glass rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
