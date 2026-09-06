import { NavBar } from "@/Components/NavBar";
import { Link, router, Head } from "@inertiajs/react";
import React, { useState, useMemo, useRef } from "react";
import {
    Trophy,
    Plus,
    Edit2,
    Trash2,
    Video,
    Image as ImageIcon,
    ExternalLink,
    Calendar,
    Users,
    Search,
    Filter,
    Gamepad2,
    Globe,
    Sparkles,
    Check,
    X,
    UploadCloud,
    FolderKanban,
    ChevronRight,
    Play
} from "lucide-react";

export default function Index({ showcases = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'top30', 'regular', 'game', 'website'
    const [programFilter, setProgramFilter] = useState("all");

    // Modal states
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [previewItem, setPreviewItem] = useState(null);

    // Create form state
    const [createForm, setCreateForm] = useState({
        title: "",
        program: "WMAD",
        category: "",
        creator_major: "",
        is_top_30: false,
        top_30_category: "game",
        files: [],
    });
    const [createProcessing, setCreateProcessing] = useState(false);
    const [createErrors, setCreateErrors] = useState({});
    const createFileRef = useRef(null);

    // Edit form state
    const [editForm, setEditForm] = useState({
        id: null,
        title: "",
        program: "",
        category: "",
        creator_major: "",
        is_top_30: false,
        top_30_category: "game",
        new_files: [],
    });
    const [editProcessing, setEditProcessing] = useState(false);
    const [editErrors, setEditErrors] = useState({});
    const editFileRef = useRef(null);

    // Statistics
    const stats = useMemo(() => {
        const total = showcases.length;
        const top30 = showcases.filter((s) => s.is_top_30).length;
        const games = showcases.filter((s) => s.top_30_category === "game").length;
        const websites = showcases.filter((s) => s.top_30_category === "website").length;
        return { total, top30, games, websites };
    }, [showcases]);

    // Programs list for dropdown
    const availablePrograms = useMemo(() => {
        const set = new Set(["WMAD", "MMA", "NICS", "BSCS", "General"]);
        showcases.forEach((s) => {
            if (s.program) set.add(s.program);
        });
        return Array.from(set);
    }, [showcases]);

    // Filtered showcases
    const filteredShowcases = useMemo(() => {
        return showcases.filter((item) => {
            // Search query
            const q = searchQuery.toLowerCase();
            const matchSearch =
                !q ||
                item.title?.toLowerCase().includes(q) ||
                item.category?.toLowerCase().includes(q) ||
                item.creator_major?.toLowerCase().includes(q) ||
                item.program?.toLowerCase().includes(q);

            // Status filter
            let matchStatus = true;
            if (statusFilter === "top30") matchStatus = !!item.is_top_30;
            else if (statusFilter === "regular") matchStatus = !item.is_top_30;
            else if (statusFilter === "game") matchStatus = item.top_30_category === "game";
            else if (statusFilter === "website") matchStatus = item.top_30_category === "website";

            // Program filter
            const matchProg =
                programFilter === "all" ||
                item.program?.toLowerCase() === programFilter.toLowerCase();

            return matchSearch && matchStatus && matchProg;
        });
    }, [showcases, searchQuery, statusFilter, programFilter]);

    // Fast Toggle Top 30
    const handleToggleTop30 = (item, newCategory = null) => {
        const data = {};
        if (newCategory) {
            data.top_30_category = newCategory;
        }
        router.post(route("admin.student-showcase.toggle-top30", item.id), data, {
            preserveScroll: true,
        });
    };

    // Fast Delete Entry
    const handleDelete = (item) => {
        if (confirm(`Are you sure you want to delete "${item.title}"? This cannot be undone.`)) {
            router.delete(route("admin.student-showcase.destroy", item.id), {
                preserveScroll: true,
            });
        }
    };

    // Delete single image
    const handleDeleteImage = (imageId) => {
        if (confirm("Delete this media file from the showcase?")) {
            router.delete(route("admin.student-showcase.image.destroy", imageId), {
                preserveScroll: true,
                onSuccess: () => {
                    if (editingItem) {
                        setEditingItem((prev) => ({
                            ...prev,
                            images: prev.images.filter((img) => img.id !== imageId),
                        }));
                    }
                },
            });
        }
    };

    // Create Submit
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        setCreateProcessing(true);
        setCreateErrors({});

        const formData = new FormData();
        formData.append("title", createForm.title);
        formData.append("program", createForm.program);
        formData.append("category", createForm.category || "");
        formData.append("creator_major", createForm.creator_major || "");
        formData.append("is_top_30", createForm.is_top_30 ? "1" : "0");
        formData.append("top_30_category", createForm.top_30_category || "game");

        createForm.files.forEach((file) => {
            formData.append("files[]", file);
        });

        router.post(route("admin.student-showcase.store"), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                setCreateForm({
                    title: "",
                    program: "WMAD",
                    category: "",
                    creator_major: "",
                    is_top_30: false,
                    top_30_category: "game",
                    files: [],
                });
                if (createFileRef.current) createFileRef.current.value = "";
            },
            onError: (errs) => setCreateErrors(errs),
            onFinish: () => setCreateProcessing(false),
        });
    };

    // Open Edit Modal
    const openEditModal = (item) => {
        setEditingItem(item);
        setEditForm({
            id: item.id,
            title: item.title || "",
            program: item.program || "WMAD",
            category: item.category || "",
            creator_major: item.creator_major || "",
            is_top_30: !!item.is_top_30,
            top_30_category: item.top_30_category || "game",
            new_files: [],
        });
        setEditErrors({});
        setIsEditOpen(true);
    };

    // Edit Submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        setEditProcessing(true);
        setEditErrors({});

        const formData = new FormData();
        formData.append("title", editForm.title);
        formData.append("program", editForm.program);
        formData.append("category", editForm.category || "");
        formData.append("creator_major", editForm.creator_major || "");
        formData.append("is_top_30", editForm.is_top_30 ? "1" : "0");
        formData.append("top_30_category", editForm.top_30_category || "game");

        editForm.new_files.forEach((file) => {
            formData.append("new_files[]", file);
        });

        router.post(route("admin.student-showcase.update", editForm.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsEditOpen(false);
                setEditingItem(null);
                setEditForm({
                    id: null,
                    title: "",
                    program: "",
                    category: "",
                    creator_major: "",
                    is_top_30: false,
                    top_30_category: "game",
                    new_files: [],
                });
                if (editFileRef.current) editFileRef.current.value = "";
            },
            onError: (errs) => setEditErrors(errs),
            onFinish: () => setEditProcessing(false),
        });
    };

    return (
        <>
            <Head title="Student Showcase Management" />
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-16">
                {/* Ambient Backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple/10 text-purple border border-purple/20">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Admin CMS
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-dark dark:text-light tracking-tight">
                                Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Showcase</span>
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
                                Curate student projects, manage top games and websites, and select the Top 30 Hall of Fame honorees.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/StudentShowcase"
                                target="_blank"
                                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-sm font-semibold rounded-2xl text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm backdrop-blur"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Public Page
                            </Link>
                            <button
                                onClick={() => setIsCreateOpen(true)}
                                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-2xl text-white bg-purple hover:bg-purple/90 shadow-lg shadow-purple/30 hover:shadow-purple/50 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <Plus className="w-5 h-5 mr-1.5" />
                                Add Showcase Project
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Projects</span>
                                <FolderKanban className="w-5 h-5 text-purple" />
                            </div>
                            <p className="text-3xl font-black text-dark dark:text-light mt-2">{stats.total}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Live in repository</p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Top 30 Honorees</span>
                                <Trophy className="w-5 h-5 text-amber-500" />
                            </div>
                            <p className="text-3xl font-black text-amber-500 mt-2">{stats.top30}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Featured in Top Showcase</p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Top Games</span>
                                <Gamepad2 className="w-5 h-5 text-pink-500" />
                            </div>
                            <p className="text-3xl font-black text-pink-500 mt-2">{stats.games}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Games track</p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Top Websites</span>
                                <Globe className="w-5 h-5 text-cyan-500" />
                            </div>
                            <p className="text-3xl font-black text-cyan-500 mt-2">{stats.websites}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Web / app track</p>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="p-4 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by title, major, category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm text-dark dark:text-light focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Status Pills */}
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                    statusFilter === "all"
                                        ? "bg-purple text-white shadow-md shadow-purple/30"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                All ({stats.total})
                            </button>
                            <button
                                onClick={() => setStatusFilter("top30")}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                    statusFilter === "top30"
                                        ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                <Trophy className="w-3 h-3" />
                                Top 30 ({stats.top30})
                            </button>
                            <button
                                onClick={() => setStatusFilter("game")}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                    statusFilter === "game"
                                        ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                <Gamepad2 className="w-3 h-3" />
                                Games ({stats.games})
                            </button>
                            <button
                                onClick={() => setStatusFilter("website")}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                    statusFilter === "website"
                                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                <Globe className="w-3 h-3" />
                                Websites ({stats.websites})
                            </button>
                            <button
                                onClick={() => setStatusFilter("regular")}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                    statusFilter === "regular"
                                        ? "bg-gray-700 text-white shadow-md"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                Regular Gallery ({stats.total - stats.top30})
                            </button>
                        </div>

                        {/* Program Dropdown */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Track:</label>
                            <select
                                value={programFilter}
                                onChange={(e) => setProgramFilter(e.target.value)}
                                className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs font-bold text-dark dark:text-light focus:ring-2 focus:ring-purple/30"
                            >
                                <option value="all">All Tracks</option>
                                {availablePrograms.map((prog) => (
                                    <option key={prog} value={prog}>
                                        {prog}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20 bg-purple/5 dark:bg-purple/20">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Media</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Project & Track</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Creator / Major</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Top 30 Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Top 30 Category</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {filteredShowcases.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                                                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30 text-purple" />
                                                <p className="text-base font-semibold">No showcase entries found.</p>
                                                <p className="text-sm mt-1">
                                                    {searchQuery || statusFilter !== "all" || programFilter !== "all"
                                                        ? "Try clearing your filters or search query."
                                                        : 'Click "Add Showcase Project" above to publish student work.'}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredShowcases.map((item) => {
                                            const firstImg = item.images && item.images.length > 0 ? item.images[0] : null;
                                            const isTop = !!item.is_top_30;

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-150 group/row"
                                                >
                                                    {/* Media Thumbnail */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => setPreviewItem(item)}
                                                            className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 relative group/thumb hover:scale-105 transition transform shadow-sm"
                                                            title="Click to preview media"
                                                        >
                                                            {firstImg ? (
                                                                firstImg.media_type === "video" ? (
                                                                    <div className="relative w-full h-full">
                                                                        <video
                                                                            src={firstImg.media_path}
                                                                            className="w-full h-full object-cover"
                                                                            muted
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                                            <Play className="w-4 h-4 text-white fill-white" />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        src={firstImg.media_path}
                                                                        alt={item.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )
                                                            ) : item.media_path ? (
                                                                <img
                                                                    src={item.media_path}
                                                                    alt={item.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                                            )}
                                                            {item.images && item.images.length > 1 && (
                                                                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur text-white text-[9px] font-bold">
                                                                    +{item.images.length}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>

                                                    {/* Title & Track */}
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-900 dark:text-white text-base">
                                                            {item.title}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple/10 text-purple border border-purple/20">
                                                                {item.program || "General"}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {item.images?.length || 0} media files
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Category */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.category ? (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                                {item.category}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">None</span>
                                                        )}
                                                    </td>

                                                    {/* Creator Major */}
                                                    <td className="px-6 py-4">
                                                        {item.creator_major ? (
                                                            <div className="text-xs font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                                                <Users className="w-3.5 h-3.5 text-purple shrink-0" />
                                                                <span>{item.creator_major}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Unassigned</span>
                                                        )}
                                                    </td>

                                                    {/* Top 30 Toggle */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleTop30(item)}
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                                                                isTop
                                                                    ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700 hover:bg-amber-200"
                                                                    : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-200"
                                                            }`}
                                                            title="Click to toggle Top 30 status"
                                                        >
                                                            <Trophy className={`w-3.5 h-3.5 ${isTop ? "text-amber-600 fill-amber-500" : "text-gray-400"}`} />
                                                            <span>{isTop ? "Top 30 Honoree" : "Regular"}</span>
                                                        </button>
                                                    </td>

                                                    {/* Top 30 Category Switcher */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {isTop ? (
                                                            <div className="inline-flex items-center p-0.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleToggleTop30(item, "game")}
                                                                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                                                                        item.top_30_category === "game"
                                                                            ? "bg-pink-500 text-white shadow-sm"
                                                                            : "text-gray-600 dark:text-gray-400 hover:text-dark dark:hover:text-light"
                                                                    }`}
                                                                >
                                                                    <Gamepad2 className="w-3 h-3" />
                                                                    <span>Game</span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleToggleTop30(item, "website")}
                                                                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                                                                        item.top_30_category === "website"
                                                                            ? "bg-cyan-500 text-white shadow-sm"
                                                                            : "text-gray-600 dark:text-gray-400 hover:text-dark dark:hover:text-light"
                                                                    }`}
                                                                >
                                                                    <Globe className="w-3 h-3" />
                                                                    <span>Web</span>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">-</span>
                                                        )}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => openEditModal(item)}
                                                                className="p-2 rounded-xl text-purple hover:bg-purple/10 dark:hover:bg-purple/20 transition"
                                                                title="Edit Project"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item)}
                                                                className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                                                title="Delete Project"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* CREATE MODAL */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-8">
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-purple" />
                                    Add Student Showcase Project
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Publish games, websites, or capstones with multiple media screenshots/videos.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                            {/* Title & Program */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Project Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Aether Sentinel, Campus Navigator"
                                        value={createForm.title}
                                        onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                    {createErrors.title && <p className="text-xs text-red-500 mt-1">{createErrors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Program / Track
                                    </label>
                                    <select
                                        value={createForm.program}
                                        onChange={(e) => setCreateForm({ ...createForm, program: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    >
                                        <option value="WMAD">WMAD (Web & Mobile App)</option>
                                        <option value="MMA">MMA (Multimedia Arts & Games)</option>
                                        <option value="NICS">NICS (Network & Cloud)</option>
                                        <option value="BSCS">BSCS (Computer Science)</option>
                                        <option value="General">General / All</option>
                                    </select>
                                </div>
                            </div>

                            {/* Category & Creator Major */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2D Platformer, Web App, 3D Art"
                                        value={createForm.category}
                                        onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Creator Major / Attribution
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. BSIT - WMAD, BSCS Batch 2026"
                                        value={createForm.creator_major}
                                        onChange={(e) => setCreateForm({ ...createForm, creator_major: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                </div>
                            </div>

                            {/* Top 30 Toggle & Category */}
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                            <Trophy className="w-4 h-4 text-amber-500" />
                                            Top 30 Hall of Fame Selection
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Feature this project in the prominent Top Games or Top Websites tier.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setCreateForm({ ...createForm, is_top_30: !createForm.is_top_30 })}
                                        className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                                            createForm.is_top_30 ? "bg-purple" : "bg-gray-300 dark:bg-gray-700"
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                                                createForm.is_top_30 ? "translate-x-6" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>

                                {createForm.is_top_30 && (
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Showcase As:</span>
                                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="create_top_30_cat"
                                                value="game"
                                                checked={createForm.top_30_category === "game"}
                                                onChange={(e) => setCreateForm({ ...createForm, top_30_category: e.target.value })}
                                                className="text-purple focus:ring-purple"
                                            />
                                            <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
                                            <span>Top Game 🎮</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="create_top_30_cat"
                                                value="website"
                                                checked={createForm.top_30_category === "website"}
                                                onChange={(e) => setCreateForm({ ...createForm, top_30_category: e.target.value })}
                                                className="text-purple focus:ring-purple"
                                            />
                                            <Globe className="w-3.5 h-3.5 text-cyan-500" />
                                            <span>Top Website 🌐</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Media File Upload */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                    Upload Screenshots & Videos <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    You can select multiple images (.jpg, .png, .webp, .gif) and videos (.mp4, .webm, .mov). The first file will be used as the primary card preview.
                                </p>
                                <input
                                    ref={createFileRef}
                                    type="file"
                                    multiple
                                    required
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const filesArr = Array.from(e.target.files || []);
                                        setCreateForm({ ...createForm, files: filesArr });
                                    }}
                                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition cursor-pointer"
                                />
                                {createErrors.files && <p className="text-xs text-red-500 mt-1">{createErrors.files}</p>}

                                {/* Selected files preview chips */}
                                {createForm.files.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {createForm.files.map((f, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-purple/10 text-purple border border-purple/20"
                                            >
                                                {f.type.startsWith("video") ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                                <span className="font-semibold max-w-[150px] truncate">{f.name}</span>
                                                <span className="text-[10px] opacity-60">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit & Cancel */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createProcessing}
                                    className="px-6 py-2.5 rounded-xl bg-purple text-white text-sm font-bold hover:bg-purple/90 shadow-md shadow-purple/30 transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {createProcessing ? "Uploading & Publishing..." : "Publish to Showcase"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {isEditOpen && editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-8">
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Edit2 className="w-5 h-5 text-purple" />
                                    Edit Showcase Project
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Update details, manage photos/videos, or adjust Top 30 status.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                            {/* Title & Program */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Project Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                    {editErrors.title && <p className="text-xs text-red-500 mt-1">{editErrors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Program / Track
                                    </label>
                                    <select
                                        value={editForm.program}
                                        onChange={(e) => setEditForm({ ...editForm, program: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    >
                                        <option value="WMAD">WMAD (Web & Mobile App)</option>
                                        <option value="MMA">MMA (Multimedia Arts & Games)</option>
                                        <option value="NICS">NICS (Network & Cloud)</option>
                                        <option value="BSCS">BSCS (Computer Science)</option>
                                        <option value="General">General / All</option>
                                    </select>
                                </div>
                            </div>

                            {/* Category & Creator Major */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2D Platformer, Web App, 3D Art"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Creator Major / Attribution
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. BSIT - WMAD, BSCS Batch 2026"
                                        value={editForm.creator_major}
                                        onChange={(e) => setEditForm({ ...editForm, creator_major: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                </div>
                            </div>

                            {/* Top 30 Toggle & Category */}
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                            <Trophy className="w-4 h-4 text-amber-500" />
                                            Top 30 Hall of Fame Selection
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Feature this project in the prominent Top Games or Top Websites tier.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setEditForm({ ...editForm, is_top_30: !editForm.is_top_30 })}
                                        className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                                            editForm.is_top_30 ? "bg-purple" : "bg-gray-300 dark:bg-gray-700"
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                                                editForm.is_top_30 ? "translate-x-6" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>

                                {editForm.is_top_30 && (
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Showcase As:</span>
                                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="edit_top_30_cat"
                                                value="game"
                                                checked={editForm.top_30_category === "game"}
                                                onChange={(e) => setEditForm({ ...editForm, top_30_category: e.target.value })}
                                                className="text-purple focus:ring-purple"
                                            />
                                            <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
                                            <span>Top Game 🎮</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="edit_top_30_cat"
                                                value="website"
                                                checked={editForm.top_30_category === "website"}
                                                onChange={(e) => setEditForm({ ...editForm, top_30_category: e.target.value })}
                                                className="text-purple focus:ring-purple"
                                            />
                                            <Globe className="w-3.5 h-3.5 text-cyan-500" />
                                            <span>Top Website 🌐</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Current Attached Media */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                                    Current Uploaded Media ({editingItem.images?.length || 0})
                                </label>
                                {editingItem.images && editingItem.images.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {editingItem.images.map((img) => (
                                            <div
                                                key={img.id}
                                                className="relative group/m aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                                            >
                                                {img.media_type === "video" ? (
                                                    <div className="w-full h-full relative">
                                                        <video src={img.media_path} className="w-full h-full object-cover" muted />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                            <Play className="w-4 h-4 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={img.media_path} alt="" className="w-full h-full object-cover" />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(img.id)}
                                                    className="absolute top-1 right-1 p-1 rounded-lg bg-red-600/90 hover:bg-red-700 text-white opacity-0 group-hover/m:opacity-100 transition shadow"
                                                    title="Delete this file"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">No media items uploaded yet.</p>
                                )}
                            </div>

                            {/* Append Additional Files */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                                    Upload More Screenshots / Videos (Optional)
                                </label>
                                <input
                                    ref={editFileRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const filesArr = Array.from(e.target.files || []);
                                        setEditForm({ ...editForm, new_files: filesArr });
                                    }}
                                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition cursor-pointer"
                                />
                                {editForm.new_files.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {editForm.new_files.map((f, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-purple/10 text-purple border border-purple/20"
                                            >
                                                <UploadCloud className="w-3 h-3" />
                                                <span className="font-semibold max-w-[150px] truncate">{f.name}</span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit & Cancel */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-6 py-2.5 rounded-xl bg-purple text-white text-sm font-bold hover:bg-purple/90 shadow-md shadow-purple/30 transition disabled:opacity-50"
                                >
                                    {editProcessing ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MEDIA PREVIEW LIGHTBOX */}
            {previewItem && (
                <div
                    onClick={() => setPreviewItem(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl p-6 overflow-hidden"
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{previewItem.title}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {previewItem.category} • {previewItem.creator_major || previewItem.program}
                                </p>
                            </div>
                            <button
                                onClick={() => setPreviewItem(null)}
                                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                            {previewItem.images && previewItem.images.length > 0 ? (
                                previewItem.images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center"
                                    >
                                        {img.media_type === "video" ? (
                                            <video src={img.media_path} controls className="w-full h-full object-contain" />
                                        ) : (
                                            <img src={img.media_path} alt="" className="w-full h-full object-contain" />
                                        )}
                                    </div>
                                ))
                            ) : previewItem.media_path ? (
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center col-span-2">
                                    <img src={previewItem.media_path} alt="" className="w-full h-full object-contain" />
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm col-span-2 py-8 text-center">No media attached to this project.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
