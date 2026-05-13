import { NavBar } from "@/Components/NavBar";
import { useForm, router, Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function Showcase({ program, video, galleryItems, categories }) {
    const { data: videoData, setData: setVideoData, post: postVideo, processing: processingVideo, errors: videoErrors } = useForm({
        video: null,
    });

    const { data: categoryData, setData: setCategoryData, post: postCategory, processing: processingCategory, errors: categoryErrors, reset: resetCategory } = useForm({
        name: "",
    });

    const [galleryData, setGalleryData] = useState({
        title: "",
        category: "",
        files: [],
        is_top_30: false,
        top_30_category: "game", // Default to game if winner
        creator_major: "", // Optional attribution
    });
    const [processingGallery, setProcessingGallery] = useState(false);
    const [galleryErrors, setGalleryErrors] = useState({});
    const fileInputRef = React.useRef(null);

    const [showVideoPreview, setShowVideoPreview] = useState(false);

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        postVideo(route("admin.specializations.update-video", program));
    };

    const handleGallerySubmit = (e) => {
        e.preventDefault();
        setProcessingGallery(true);
        setGalleryErrors({});

        const formData = new FormData();
        formData.append('title', galleryData.title);
        formData.append('category', galleryData.category);
        formData.append('is_top_30', galleryData.is_top_30 ? '1' : '0');
        formData.append('top_30_category', galleryData.top_30_category);
        formData.append('creator_major', galleryData.creator_major);

        galleryData.files.forEach((file) => {
            formData.append('files[]', file);
        });

        router.post(route("admin.specializations.store-gallery", program), formData, {
            forceFormData: true,
            onSuccess: () => {
                setGalleryData({ title: "", category: "", files: [], is_top_30: false, top_30_category: "game" });
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            onError: (errors) => setGalleryErrors(errors),
            onFinish: () => setProcessingGallery(false),
        });
    };

    const handleFilesSelected = (e) => {
        const newFiles = Array.from(e.target.files);
        setGalleryData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
        // Reset the input so the same file can be re-selected if removed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeFile = (index) => {
        setGalleryData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index),
        }));
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        postCategory(route("admin.specializations.store-category", program), {
            onSuccess: () => resetCategory(),
        });
    };

    const handleDeleteCategory = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route("admin.specializations.destroy-category", id));
        }
    };

    const handleDeleteGalleryItem = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            router.delete(route("admin.specializations.destroy-gallery", id));
        }
    };

    const handleToggleTop30 = (id, category = null) => {
        router.post(route("admin.specializations.toggle-top30", id), {
            top_30_category: category
        });
    };

    return (
        <>
            <Head title={`Admin - ${program} Showcase`} />
            <NavBar />
            <div className="min-h-screen bg-light dark:bg-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-dark dark:text-light tracking-tight">
                                Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">{program}</span> Content
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                Update the main video and student gallery.
                            </p>
                        </div>
                    </div>

                    {/* Video Section */}
                    <section className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-dark dark:text-light mb-6 flex items-center gap-3">
                            <span className="p-2 rounded-lg bg-purple/10 text-purple">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            </span>
                            Main Video
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                {video ? (
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                                        <video src={video} controls className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="aspect-video rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-white/10">
                                        <p className="text-gray-500">No video uploaded</p>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleVideoSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Upload New Video (MP4, Max 500MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/mp4,video/quicktime"
                                        onChange={(e) => setVideoData("video", e.target.files[0])}
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2.5 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-purple file:text-white
                                            hover:file:bg-purple/90 cursor-pointer
                                            bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10"
                                    />
                                    {videoErrors.video && <p className="mt-2 text-sm text-red-500">{videoErrors.video}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processingVideo || !videoData.video}
                                    className="w-full px-6 py-3 rounded-xl bg-dark dark:bg-light text-light dark:text-dark font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processingVideo ? "Uploading..." : "Update Video"}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Gallery Section */}
                    <section className="space-y-8">
                        <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-bold text-dark dark:text-light flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-purple/10 text-purple">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </span>
                                Student Gallery
                            </h2>
                        </div>

                        {/* Category Management */}
                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl mb-8">
                            <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">Manage Categories</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* List */}
                                <div className="space-y-2">
                                    {categories && categories.length > 0 ? (
                                        <ul className="space-y-2">
                                            {categories.map((cat) => (
                                                <li key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10">
                                                    <span className="text-sm font-medium text-dark dark:text-light">{cat.name}</span>
                                                    <button
                                                        onClick={() => handleDeleteCategory(cat.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Delete Category"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No categories created yet.</p>
                                    )}
                                </div>

                                {/* Add Form */}
                                <div>
                                    <form onSubmit={handleCategorySubmit} className="flex gap-4 items-end">
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Category Name</label>
                                            <input
                                                type="text"
                                                value={categoryData.name}
                                                onChange={(e) => setCategoryData("name", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-purple focus:border-transparent text-dark dark:text-light"
                                                placeholder="e.g. 2D Animation"
                                            />
                                            {categoryErrors.name && <p className="mt-1 text-xs text-red-500">{categoryErrors.name}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processingCategory}
                                            className="px-6 py-2.5 rounded-lg bg-dark dark:bg-purple text-white font-bold hover:opacity-90 transition-all disabled:opacity-50"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Add New Item Form */}
                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                            <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">Add Gallery Item(s)</h3>
                            <form onSubmit={handleGallerySubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left: Project Classification */}
                                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Project Type (Required)</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => setGalleryData(prev => ({...prev, top_30_category: 'game'}))}
                                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${galleryData.top_30_category === 'game' 
                                                        ? 'bg-purple border-purple text-white shadow-lg' 
                                                        : 'bg-white dark:bg-black/40 border-transparent text-gray-500 hover:border-purple/30'}`}
                                                >
                                                    <span className="text-2xl">🎮</span>
                                                    <span className="text-sm font-bold">GAME</span>
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setGalleryData(prev => ({...prev, top_30_category: 'website'}))}
                                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${galleryData.top_30_category === 'website' 
                                                        ? 'bg-purple border-purple text-white shadow-lg' 
                                                        : 'bg-white dark:bg-black/40 border-transparent text-gray-500 hover:border-purple/30'}`}
                                                >
                                                    <span className="text-2xl">🌐</span>
                                                    <span className="text-sm font-bold">WEBSITE</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-200 dark:border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-bold text-dark dark:text-light uppercase tracking-wider">Hall of Fame Winner?</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Check this if it belongs in the Top 30.</p>
                                                </div>
                                                <label className="flex items-center cursor-pointer group">
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only"
                                                            checked={galleryData.is_top_30}
                                                            onChange={(e) => setGalleryData(prev => ({ ...prev, is_top_30: e.target.checked }))}
                                                        />
                                                        <div className={`w-12 h-6 rounded-full transition-colors ${galleryData.is_top_30 ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-gray-300 dark:bg-white/10'}`}></div>
                                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${galleryData.is_top_30 ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Metadata */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-bold uppercase tracking-wider">Project Title</label>
                                            <input
                                                type="text"
                                                value={galleryData.title}
                                                onChange={(e) => setGalleryData(prev => ({ ...prev, title: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-purple focus:border-transparent text-dark dark:text-light transition-all shadow-inner"
                                                placeholder="e.g. Project Alpha"
                                            />
                                            {galleryErrors.title && <p className="mt-1 text-xs text-red-500 font-medium">{galleryErrors.title}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Major Attribution</label>
                                                <select
                                                    value={galleryData.creator_major}
                                                    onChange={(e) => setGalleryData(prev => ({ ...prev, creator_major: e.target.value }))}
                                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm text-dark dark:text-light"
                                                >
                                                    <option value="">Unknown/Other</option>
                                                    <option value="MMA">MMA (ITEM)</option>
                                                    <option value="WMAD">WMAD (ITEW)</option>
                                                    <option value="NICS">NICS (ITEN)</option>
                                                    <option value="CSE">CSE</option>
                                                </select>
                                            </div>

                                            {!galleryData.is_top_30 && (
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Specialization</label>
                                                    <select
                                                        value={galleryData.category}
                                                        onChange={(e) => setGalleryData(prev => ({ ...prev, category: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm text-dark dark:text-light"
                                                    >
                                                        <option value="">None</option>
                                                        {categories && categories.map((cat) => (
                                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            {/* File picker area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Media Files (Images / Videos — select multiple)</label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*,video/mp4,video/quicktime,video/x-m4v"
                                        multiple
                                        onChange={handleFilesSelected}
                                        className="block w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 cursor-pointer"
                                    />
                                    {galleryErrors['files'] && <p className="mt-1 text-xs text-red-500">{galleryErrors['files']}</p>}
                                    {galleryErrors['files.0'] && <p className="mt-1 text-xs text-red-500">{galleryErrors['files.0']}</p>}
                                </div>

                                {/* Selected files preview list */}
                                {galleryData.files.length > 0 && (
                                    <div className="bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/10 p-4">
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                            {galleryData.files.length} file{galleryData.files.length > 1 ? 's' : ''} selected
                                        </p>
                                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                                            {galleryData.files.map((file, idx) => (
                                                <li key={idx} className="flex items-center justify-between py-1.5 px-3 bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                                            file.type.startsWith('video') ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-purple/10 text-purple'
                                                        }`}>
                                                            {file.type.startsWith('video') ? '🎬' : '🖼️'}
                                                        </span>
                                                        <span className="text-sm text-dark dark:text-light truncate">{file.name}</span>
                                                        <span className="text-xs text-gray-400 flex-shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(idx)}
                                                        className="flex-shrink-0 ml-2 p-1 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                        title="Remove file"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processingGallery || galleryData.files.length === 0}
                                    className="w-full md:w-auto px-8 py-2.5 rounded-lg bg-purple text-white font-bold hover:bg-purple/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processingGallery ? "Uploading..." : `Add ${galleryData.files.length > 1 ? galleryData.files.length + ' Items' : 'Item'}`}
                                </button>
                            </form>
                        </div>

                        {/* Gallery Grid */}
                        {/* Gallery Grid grouped by Category */}
                        <div className="space-y-12">
                            {categories && categories.map(cat => {
                                const catItems = galleryItems.filter(item => item.category === cat.name);
                                if (catItems.length === 0) return null;

                                return (
                                    <CategorySection
                                        key={cat.id}
                                        title={cat.name}
                                        color="bg-purple"
                                        items={catItems}
                                        onDelete={handleDeleteGalleryItem}
                                        onToggleTop30={handleToggleTop30}
                                    />
                                );
                            })}

                            {/* Uncategorized Section */}
                            {(() => {
                                const knownCategories = categories?.map(c => c.name) || [];
                                const uncategorizedItems = galleryItems.filter(item => !item.category || !knownCategories.includes(item.category));

                                if (uncategorizedItems.length > 0) {
                                    return (
                                        <CategorySection
                                            title="Uncategorized"
                                            color="bg-gray-400"
                                            items={uncategorizedItems}
                                            onDelete={handleDeleteGalleryItem}
                                            onToggleTop30={handleToggleTop30}
                                            isUncategorized={true}
                                        />
                                    );
                                }
                            })()}

                            {galleryItems.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-3xl">
                                    <p>No gallery items found.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

// Pagination Component
function CategorySection({ title, color, items, onDelete, onToggleTop30, isUncategorized = false }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 if items change significantly (optional, but good practice)
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [items.length, totalPages, currentPage]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${isUncategorized ? 'text-gray-500 dark:text-gray-400' : 'text-dark dark:text-light'} flex items-center gap-2`}>
                    <span className={`w-2 h-8 ${color} rounded-full`}></span>
                    {title} <span className="text-sm font-normal opacity-60">({items.length} items)</span>
                </h3>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Previous Page"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <span className="text-sm font-mono text-gray-500">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Next Page"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item) => {
                    const firstImg = item.images && item.images.length > 0 ? item.images[0] : null;
                    const imgCount = item.images ? item.images.length : 0;

                    return (
                    <div key={item.id} className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black shadow-lg border border-white/10 ${isUncategorized ? 'opacity-75 hover:opacity-100 transition-opacity' : ''}`}>
                        {firstImg ? (
                            firstImg.media_type === 'video' ? (
                                <div className="w-full h-full flex items-center justify-center bg-black">
                                    <video src={firstImg.media_path} className="w-full h-full object-contain pointer-events-none" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black">
                                    <img src={firstImg.media_path} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-gray-600 text-sm">No media</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        {/* Image count badge */}
                        {imgCount > 1 && (
                            <div className="absolute top-4 right-14 z-20 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                                {imgCount} files
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            {isUncategorized && <p className="text-xs font-mono text-gray-400 mb-1">No Category</p>}
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        </div>

                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                            {item.is_top_30 ? (
                                <button
                                    onClick={() => onToggleTop30(item.id)}
                                    className="p-2 rounded-full bg-yellow-500 border border-yellow-400 text-white shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all"
                                    title={`Remove from Top 30 (${item.top_30_category})`}
                                >
                                    <svg className="w-4 h-4 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </button>
                            ) : (
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onToggleTop30(item.id, 'game')}
                                        className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white hover:bg-purple/80 transition-all"
                                        title="Mark as Top Game"
                                    >
                                        + Game
                                    </button>
                                    <button
                                        onClick={() => onToggleTop30(item.id, 'website')}
                                        className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white hover:bg-blue-500/80 transition-all"
                                        title="Mark as Top Website"
                                    >
                                        + Web
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => onDelete(item.id)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 scale-90 group-hover:scale-100 z-20"
                            title="Delete Item"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
