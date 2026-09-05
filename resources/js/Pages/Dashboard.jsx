import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Dashboard({ auth, siteSettings }) {
    const isInitiallyVisible = (siteSettings?.show_highlights ?? siteSettings?.show_sneak_peek ?? 'true') === 'true';

    const { data, setData, post, processing, recentlySuccessful, reset } = useForm({
        show_highlights: isInitiallyVisible ? 'true' : 'false',
        highlight_badge: siteSettings?.highlight_badge ?? 'FEATURED SPOTLIGHT',
        highlight_title: siteSettings?.highlight_title || siteSettings?.sneak_peek_title || 'Hall of Fame Showcase',
        highlight_subtitle: siteSettings?.highlight_subtitle || siteSettings?.sneak_peek_subtitle || 'The results are in! Explore the elite game and web applications developed by our talented IT students.',
        highlight_button_text: siteSettings?.highlight_button_text || 'Enter the Showcase',
        highlight_button_link: siteSettings?.highlight_button_link || '/HallOfFame',
        highlight_media: null,
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const currentMediaPath = siteSettings?.highlight_media_path || siteSettings?.sneak_peek_video;
    const currentMediaType = siteSettings?.highlight_media_type || (currentMediaPath?.endsWith('.mp4') || currentMediaPath?.endsWith('.webm') ? 'video' : 'image');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('highlight_media', file);
        if (file) {
            setMediaPreview(URL.createObjectURL(file));
        } else {
            setMediaPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setMediaPreview(null);
            }
        });
    };

    // Quick fill presets
    const applyPreset = (preset) => {
        if (preset === 'hall_of_fame') {
            setData((prev) => ({
                ...prev,
                highlight_badge: 'FEATURED SPOTLIGHT',
                highlight_title: 'Hall of Fame Showcase',
                highlight_subtitle: 'The results are in! Explore the elite game and web applications developed by our talented IT students.',
                highlight_button_text: 'Enter the Showcase',
                highlight_button_link: '/HallOfFame',
            }));
        } else if (preset === 'events') {
            setData((prev) => ({
                ...prev,
                highlight_badge: 'UPCOMING & RECENT',
                highlight_title: 'Campus Events & Activities',
                highlight_subtitle: 'Discover upcoming hackathons, tech workshops, and community showcases in our IT department.',
                highlight_button_text: 'Explore Events',
                highlight_button_link: '/Events',
            }));
        } else if (preset === 'recognitions') {
            setData((prev) => ({
                ...prev,
                highlight_badge: 'ACCREDITED EXCELLENCE',
                highlight_title: 'Recognitions & Accreditations',
                highlight_subtitle: 'Proudly recognized by CHED and accredited by PICAB for meeting global computing education standards.',
                highlight_button_text: 'View Accreditations',
                highlight_button_link: '/Recognitions',
            }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Dashboard & Site Settings
                    </h2>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        Admin CMS
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-transparent border border-purple-500/20 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Welcome back, {auth.user.name}!
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Manage your homepage highlights, visibility, showcase spotlight, and custom announcements in real-time.
                            </p>
                        </div>
                        <Link
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50 shadow-sm hover:shadow hover:scale-[1.02] transition-all"
                        >
                            <span>View Public Site</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Highlights CMS Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                Homepage Highlights & Spotlight Section
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Toggle visibility on/off or change the spotlight message, media, and button link anytime.
                            </p>
                        </div>

                        {/* Visibility Status Badge */}
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${data.show_highlights === 'true' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700'}`}>
                                <span className={`w-2 h-2 rounded-full ${data.show_highlights === 'true' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                                {data.show_highlights === 'true' ? 'Visible on Homepage' : 'Hidden from Homepage'}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-8">
                        {/* Visibility Toggle Switch */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                            <div>
                                <label htmlFor="show_highlights_toggle" className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer">
                                    Display Highlights Section
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Turn this switch off to instantly hide the entire Highlights section from the homepage.
                                </p>
                            </div>
                            <button
                                id="show_highlights_toggle"
                                type="button"
                                onClick={() => setData('show_highlights', data.show_highlights === 'true' ? 'false' : 'true')}
                                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${data.show_highlights === 'true' ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.show_highlights === 'true' ? 'translate-x-7' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>

                        {data.show_highlights === 'true' && (
                            <div className="space-y-6 pt-2">
                                {/* Quick Preset Chips */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Quick Presets (Click to autofill)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => applyPreset('hall_of_fame')}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition"
                                        >
                                            Hall of Fame Preset
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applyPreset('events')}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition"
                                        >
                                            Events Spotlight Preset
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applyPreset('recognitions')}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition"
                                        >
                                            Accreditations Preset
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Eyebrow / Badge */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            Eyebrow Badge / Tag
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. FEATURED SPOTLIGHT, ANNOUNCEMENT"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm"
                                            value={data.highlight_badge}
                                            onChange={(e) => setData('highlight_badge', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Small tag displayed above the main headline.
                                        </p>
                                    </div>

                                    {/* Highlight Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            Main Headline Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Hall of Fame Showcase"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm font-bold"
                                            value={data.highlight_title}
                                            onChange={(e) => setData('highlight_title', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Subtitle / Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Subtitle / Description Text
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Write an inviting overview for this highlight..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm leading-relaxed"
                                        value={data.highlight_subtitle}
                                        onChange={(e) => setData('highlight_subtitle', e.target.value)}
                                    />
                                </div>

                                {/* Button Configuration */}
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-4">
                                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Action Button Configuration
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                                Button Text
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Enter the Showcase"
                                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 text-sm"
                                                value={data.highlight_button_text}
                                                onChange={(e) => setData('highlight_button_text', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                                Button Link (Route or URL)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. /HallOfFame or https://..."
                                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 text-sm"
                                                value={data.highlight_button_link}
                                                onChange={(e) => setData('highlight_button_link', e.target.value)}
                                            />
                                            <div className="flex gap-2 mt-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => setData('highlight_button_link', '/HallOfFame')}
                                                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline"
                                                >
                                                    /HallOfFame
                                                </button>
                                                <span className="text-gray-400 text-[11px]">•</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('highlight_button_link', '/Events')}
                                                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline"
                                                >
                                                    /Events
                                                </button>
                                                <span className="text-gray-400 text-[11px]">•</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('highlight_button_link', '/Recognitions')}
                                                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline"
                                                >
                                                    /Recognitions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Attachment (Image or Video) */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Highlight Media (Optional Image or Video)
                                    </label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Upload a video (.mp4, .webm) or showcase image (.jpg, .png, .webp). Supports any aspect ratio (portrait, landscape, square). Max size 100MB.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm,video/ogg,image/jpeg,image/png,image/webp,image/gif"
                                            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-950/60 dark:file:text-purple-300 transition"
                                            onChange={handleFileChange}
                                        />

                                        {currentMediaPath && (
                                            <Link
                                                href={route('admin.settings.media.destroy')}
                                                method="delete"
                                                as="button"
                                                type="button"
                                                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-900/50 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span>Delete Media</span>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Active / Preview Media */}
                                    {(mediaPreview || currentMediaPath) && (
                                        <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
                                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                                                <span>Preview of Attached Media:</span>
                                                {mediaPreview && <span className="text-purple-600 dark:text-purple-400 font-normal">(New upload pending save)</span>}
                                            </p>
                                            <div className="max-w-xl rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-md relative bg-black/70 flex items-center justify-center min-h-[200px] max-h-[380px]">
                                                {(mediaPreview && data.highlight_media?.type?.startsWith('image')) || (!mediaPreview && currentMediaType === 'image') ? (
                                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[200px] max-h-[380px]">
                                                        <img
                                                            src={mediaPreview || currentMediaPath}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                                                        />
                                                        <img
                                                            src={mediaPreview || currentMediaPath}
                                                            alt="Preview"
                                                            className="relative z-10 max-h-[360px] w-auto max-w-full object-contain mx-auto"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[200px] max-h-[380px]">
                                                        <video
                                                            src={mediaPreview || currentMediaPath}
                                                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                                                            muted
                                                        />
                                                        <video
                                                            src={mediaPreview || currentMediaPath}
                                                            className="relative z-10 max-h-[360px] w-auto max-w-full object-contain mx-auto"
                                                            controls
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Live Mini Preview Box */}
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <span>Live Preview</span>
                                        <span className="text-[11px] font-normal lowercase text-gray-400">(how it looks to visitors)</span>
                                    </h4>

                                    <div className="rounded-2xl border border-purple-500/20 dark:border-purple-500/30 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-inner">
                                        {data.highlight_badge && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold text-[11px] uppercase tracking-wider mb-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                                {data.highlight_badge}
                                            </div>
                                        )}
                                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">
                                            {data.highlight_title || 'Untitled Highlight'}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-6">
                                            {data.highlight_subtitle}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white text-xs uppercase tracking-wider bg-purple-600 shadow-md shadow-purple-600/30">
                                            <span>{data.highlight_button_text || 'Action Button'}</span>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                                disabled={processing}
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                            >
                                {processing ? (
                                    <span>Saving Changes...</span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Save Highlights Settings</span>
                                    </>
                                )}
                            </button>

                            {recentlySuccessful && (
                                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Settings saved successfully.</span>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
