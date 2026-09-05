import InputLabel from "@/Components/InputLabel";
import { NavBar } from "@/Components/NavBar";
import { Head, Link, useForm, router } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import {
    Trophy,
    Upload,
    Video,
    Image as ImageIcon,
    X,
    ArrowLeft,
    Users,
    User,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Film,
    Plus,
    Layers,
    Trash2
} from "lucide-react";

export default function Edit({ competition }) {
    const { data, setData, processing, errors } = useForm({
        title: competition.title || "",
        competition_name: competition.competition_name || "",
        award: competition.award || "",
        category: competition.category || "Hackathon",
        event_date: competition.event_date ? competition.event_date.substring(0, 10) : "",
        team_members: competition.team_members || "",
        coach: competition.coach || "",
        content: competition.content || "",
        media: null,
        gallery: [],
        status: competition.status || "active",
        _method: "PUT",
    });

    const [previewUrl, setPreviewUrl] = useState(competition.media_path || null);
    const [previewType, setPreviewType] = useState(competition.media_type || "image");
    const [isNewFile, setIsNewFile] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Gallery state
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [galleryError, setGalleryError] = useState(null);
    const [isGalleryDragging, setIsGalleryDragging] = useState(false);
    const galleryInputRef = useRef(null);

    const MAX_IMAGE_SIZE_MB = 20;
    const MAX_VIDEO_SIZE_MB = 100;

    const handleGalleryFiles = (filesList) => {
        setGalleryError(null);
        const newFiles = Array.from(filesList);
        const validFiles = [];
        const newPreviews = [];

        for (const file of newFiles) {
            const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov|ogg|m4v)$/i.test(file.name);
            const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

            if (!isImage && !isVideo) {
                setGalleryError(`"${file.name}" is not a supported image or video format.`);
                continue;
            }

            const sizeMB = file.size / (1024 * 1024);
            const limitMB = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;
            if (sizeMB > limitMB) {
                setGalleryError(`"${file.name}" (${sizeMB.toFixed(1)} MB) exceeds the ${limitMB} MB limit.`);
                continue;
            }

            validFiles.push(file);
            newPreviews.push({
                file,
                url: URL.createObjectURL(file),
                type: isVideo ? "video" : "image",
                name: file.name,
                size: `${sizeMB.toFixed(1)} MB`,
            });
        }

        setGalleryFiles((prev) => {
            const updated = [...prev, ...validFiles];
            setData("gallery", updated);
            return updated;
        });

        setGalleryPreviews((prev) => [...prev, ...newPreviews]);
        if (galleryInputRef.current) galleryInputRef.current.value = "";
    };

    const removeNewGalleryFile = (index) => {
        setGalleryFiles((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setData("gallery", updated);
            return updated;
        });
        setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteExistingGallery = (id) => {
        if (confirm("Are you sure you want to permanently delete this gallery item?")) {
            router.delete(route("competitions.gallery.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const validateAndSetMedia = (file) => {
        setFileError(null);
        if (!file) return;

        const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov|ogg|m4v)$/i.test(file.name);
        const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

        if (!isImage && !isVideo) {
            setFileError({
                title: "Unsupported File Format",
                message: `"${file.name}" is not a supported media format. Please upload a standard image (JPG, PNG, WebP, GIF, SVG) or video (MP4, WebM, MOV).`
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        const maxLimitMB = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;

        if (fileSizeMB > maxLimitMB) {
            setFileError({
                title: isVideo ? "Video Exceeds Maximum Size Limit" : "Image Exceeds Maximum Size Limit",
                message: `"${file.name}" is ${fileSizeMB.toFixed(1)} MB. The maximum allowed limit for ${isVideo ? "videos" : "images"} is ${maxLimitMB} MB. Please upload a smaller or compressed file.`
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        // Passed validation
        setData("media", file);
        setFileInfo({
            name: file.name,
            size: `${fileSizeMB.toFixed(1)} MB`,
            type: isVideo ? "video" : "image"
        });
        setPreviewType(isVideo ? "video" : "image");
        setPreviewUrl(URL.createObjectURL(file));
        setIsNewFile(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndSetMedia(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetMedia(file);
        }
    };

    const clearMedia = () => {
        setData("media", null);
        setPreviewUrl(null);
        setPreviewType(null);
        setIsNewFile(false);
        setFileInfo(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("competitions.update", competition.id), data, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${competition.title}`} />
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("competitions.index")}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-light">
                                    Edit Competition / <span className="text-purple">Achievement</span>
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    Update competition details, awards, team participants, or uploaded media.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Title & Competition Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel>Title / Headline *</InputLabel>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        required
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <InputLabel>Competition / Event Name *</InputLabel>
                                    <input
                                        type="text"
                                        name="competition_name"
                                        value={data.competition_name}
                                        onChange={(e) => setData("competition_name", e.target.value)}
                                        required
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                    {errors.competition_name && <p className="text-xs text-red-500 mt-1">{errors.competition_name}</p>}
                                </div>
                            </div>

                            {/* Award (Flexible) & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <InputLabel>Award / Placement</InputLabel>
                                        <span className="text-[11px] text-gray-400">Optional</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="award"
                                        placeholder="e.g. Champion, 1st Runner Up, or Leave Blank"
                                        value={data.award}
                                        onChange={(e) => setData("award", e.target.value)}
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <InputLabel>Category</InputLabel>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData("category", e.target.value)}
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    >
                                        <option value="Hackathon">Hackathon</option>
                                        <option value="Cybersecurity">Cybersecurity / CTF</option>
                                        <option value="Game Development">Game Development</option>
                                        <option value="Web & Mobile Development">Web & Mobile Development</option>
                                        <option value="Data Science & AI">Data Science & AI</option>
                                        <option value="Programming Competition">Programming Competition</option>
                                        <option value="Robotics & IoT">Robotics & IoT</option>
                                        <option value="General Competition">General Competition</option>
                                    </select>
                                </div>

                                <div>
                                    <InputLabel>Event Date</InputLabel>
                                    <input
                                        type="date"
                                        name="event_date"
                                        value={data.event_date}
                                        onChange={(e) => setData("event_date", e.target.value)}
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Team Members & Coach */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <InputLabel>Team Members / Participants</InputLabel>
                                        <span className="text-[11px] text-gray-400">Optional</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="team_members"
                                        placeholder="e.g. John Doe, Jane Smith, Alex Lee"
                                        value={data.team_members}
                                        onChange={(e) => setData("team_members", e.target.value)}
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <InputLabel>Coach / Mentor</InputLabel>
                                        <span className="text-[11px] text-gray-400">Optional</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="coach"
                                        placeholder="e.g. Engr. Mark Santos"
                                        value={data.coach}
                                        onChange={(e) => setData("coach", e.target.value)}
                                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Story / Experience Content */}
                            <div>
                                <InputLabel>Competition Story / Summary</InputLabel>
                                <textarea
                                    name="content"
                                    rows="5"
                                    value={data.content}
                                    onChange={(e) => setData("content", e.target.value)}
                                    className="w-full mt-1.5 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none text-sm leading-relaxed"
                                ></textarea>
                            </div>

                            {/* Media Upload */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <InputLabel>Competition Media (Photo or Video)</InputLabel>
                                    <span className="text-[11px] text-gray-400 font-medium">Optional</span>
                                </div>

                                {/* Standard Upload Guidelines Badge */}
                                <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 flex items-center gap-1.5 font-medium">
                                        <ImageIcon className="w-3.5 h-3.5 text-purple" />
                                        Images: JPG, PNG, WebP (Max 20MB)
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 flex items-center gap-1.5 font-medium">
                                        <Film className="w-3.5 h-3.5 text-indigo-400" />
                                        Videos: MP4, WebM, MOV (Max 100MB)
                                    </span>
                                </div>

                                {/* Error Banner (File Size Exceeded / Invalid Format) */}
                                {fileError && (
                                    <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-3 animate-fadeIn">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                                        <div className="flex-grow text-xs leading-relaxed">
                                            <p className="font-bold text-sm mb-0.5">{fileError.title}</p>
                                            <p>{fileError.message}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFileError(null)}
                                            className="p-1 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Upload Dropzone / Preview */}
                                <div>
                                    {!previewUrl ? (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-all group ${
                                                isDragging
                                                    ? "border-purple bg-purple/10 scale-[1.01]"
                                                    : "border-gray-300 dark:border-gray-700 hover:border-purple bg-gray-50/70 dark:bg-gray-800/40 hover:bg-purple/5"
                                            }`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-purple/10 flex items-center justify-center text-purple mb-3.5 group-hover:scale-110 transition-transform shadow-inner">
                                                <Upload className="w-7 h-7" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center">
                                                {isDragging ? "Drop your media file here" : "Click to browse or drag & drop photo/video"}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center max-w-sm">
                                                Automatic orientation adaptation for landscape, portrait posters, and vertical mobile videos.
                                            </p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime,video/ogg"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {/* Preview Container with Ambient Backdrop */}
                                            <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-zinc-950 min-h-[220px] max-h-80 flex items-center justify-center p-2 shadow-inner">
                                                {previewType === "video" ? (
                                                    <>
                                                        <video
                                                            src={previewUrl}
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none"
                                                            muted
                                                        />
                                                        <video
                                                            src={previewUrl}
                                                            controls
                                                            className="relative z-10 w-auto max-w-full max-h-72 object-contain rounded-lg shadow-lg"
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <img
                                                            src={previewUrl}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                                                        />
                                                        <img
                                                            src={previewUrl}
                                                            alt="Preview"
                                                            className="relative z-10 w-auto max-w-full max-h-72 object-contain rounded-lg shadow-lg"
                                                        />
                                                    </>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={clearMedia}
                                                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-lg"
                                                    title="Replace / Remove Media"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* File Info Chip */}
                                            {fileInfo && (
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[220px] sm:max-w-xs">
                                                            {fileInfo.name}
                                                        </span>
                                                        <span className="px-2 py-0.5 rounded-full bg-purple/10 text-purple font-bold text-[10px] uppercase">
                                                            {fileInfo.size}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="text-xs font-bold text-purple hover:underline"
                                                    >
                                                        Change File
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {errors.media && <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors.media}</p>}
                            </div>

                            {/* Gallery Management (Existing & New Uploads) */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-purple" />
                                        <InputLabel>Competition Gallery (Multiple Images & Videos)</InputLabel>
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-medium">Optional</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Manage existing gallery assets or upload additional competition photos, presentation slides, certificates, and demo videos.
                                </p>

                                {/* Existing Gallery Grid */}
                                {competition.gallery && competition.gallery.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                Active Gallery Assets ({competition.gallery.length})
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                Click trash icon to permanently remove
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {competition.gallery.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-zinc-950 aspect-video flex items-center justify-center shadow-sm"
                                                >
                                                    {/* Blurred backdrop for orientation flexibility */}
                                                    {item.media_type === "video" ? (
                                                        <video
                                                            src={item.media_path}
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 pointer-events-none"
                                                            muted
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.media_path}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 pointer-events-none"
                                                        />
                                                    )}

                                                    {/* Foreground media */}
                                                    {item.media_type === "video" ? (
                                                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                            <video
                                                                src={item.media_path}
                                                                className="max-h-full max-w-full object-contain"
                                                                muted
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                                                                <Video className="w-5 h-5 text-white drop-shadow" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={item.media_path}
                                                            alt="Gallery Item"
                                                            className="relative z-10 max-h-full max-w-full object-contain p-1"
                                                        />
                                                    )}

                                                    {/* Type Badge */}
                                                    <span className="absolute bottom-1.5 left-1.5 z-20 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur text-white text-[9px] font-bold uppercase tracking-wider">
                                                        {item.media_type}
                                                    </span>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteExistingGallery(item.id)}
                                                        className="absolute top-1.5 right-1.5 z-20 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow-md transition-all hover:scale-110"
                                                        title="Delete from gallery"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Gallery Error Banner */}
                                {galleryError && (
                                    <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-between gap-3 text-xs animate-fadeIn">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                                            <span>{galleryError}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setGalleryError(null)}
                                            className="p-1 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}

                                {/* Upload New Gallery Items Dropzone */}
                                <div
                                    onClick={() => galleryInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setIsGalleryDragging(true); }}
                                    onDragLeave={() => setIsGalleryDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsGalleryDragging(false);
                                        if (e.dataTransfer.files?.length) {
                                            handleGalleryFiles(e.dataTransfer.files);
                                        }
                                    }}
                                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                                        isGalleryDragging
                                            ? "border-purple bg-purple/10 scale-[1.01]"
                                            : "border-gray-300 dark:border-gray-700 hover:border-purple bg-gray-50/50 dark:bg-gray-800/30 hover:bg-purple/5"
                                    }`}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-purple/10 flex items-center justify-center text-purple mb-2">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 text-center">
                                        Upload more images or videos to gallery
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        Images up to 20MB &bull; Videos up to 100MB
                                    </p>
                                    <input
                                        ref={galleryInputRef}
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime,video/ogg"
                                        onChange={(e) => {
                                            if (e.target.files?.length) {
                                                handleGalleryFiles(e.target.files);
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </div>

                                {/* Newly Selected Gallery Items */}
                                {galleryPreviews.length > 0 && (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                New Items to Upload ({galleryPreviews.length})
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setGalleryFiles([]);
                                                    setGalleryPreviews([]);
                                                    setData("gallery", []);
                                                }}
                                                className="text-[11px] text-red-500 hover:underline font-semibold"
                                            >
                                                Clear all
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {galleryPreviews.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group relative rounded-xl overflow-hidden border border-purple/30 bg-zinc-950 aspect-video flex items-center justify-center shadow-sm ring-1 ring-purple/20"
                                                >
                                                    {item.type === "video" ? (
                                                        <video
                                                            src={item.url}
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 pointer-events-none"
                                                            muted
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.url}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 pointer-events-none"
                                                        />
                                                    )}

                                                    {item.type === "video" ? (
                                                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                            <video
                                                                src={item.url}
                                                                className="max-h-full max-w-full object-contain"
                                                                muted
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                                                                <Video className="w-5 h-5 text-white drop-shadow" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={item.url}
                                                            alt={item.name}
                                                            className="relative z-10 max-h-full max-w-full object-contain p-1"
                                                        />
                                                    )}

                                                    <span className="absolute bottom-1.5 left-1.5 z-20 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur text-white text-[9px] font-bold uppercase tracking-wider">
                                                        New {item.type}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewGalleryFile(idx)}
                                                        className="absolute top-1.5 right-1.5 z-20 p-1 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow transition-colors"
                                                        title="Remove from upload queue"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {errors["gallery"] && <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors["gallery"]}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel>Status</InputLabel>
                                <select
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="w-full md:w-48 mt-1.5 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple/50 focus:outline-none"
                                >
                                    <option value="active">Active (Visible)</option>
                                    <option value="inactive">Inactive (Hidden)</option>
                                </select>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("competitions.index")}
                                    className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-2.5 rounded-full bg-purple hover:bg-purple/90 text-white font-bold text-sm shadow-lg shadow-purple/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                                >
                                    {processing ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
