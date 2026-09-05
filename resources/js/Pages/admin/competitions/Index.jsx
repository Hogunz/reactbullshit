import { NavBar } from "@/Components/NavBar";
import { Link, useForm, Head } from "@inertiajs/react";
import React from "react";
import { Trophy, Plus, Edit2, Trash2, Video, Image as ImageIcon, ExternalLink, Calendar, Users } from "lucide-react";

export default function Index({ competitions = [] }) {
    const { delete: destroy } = useForm({});

    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this competition entry?")) {
            destroy(route("competitions.destroy", id));
        }
    }

    const getAwardBadge = (award) => {
        if (!award) return null;
        const low = award.toLowerCase();
        let bg = "bg-purple/10 text-purple border-purple/20";
        if (low.includes("1st") || low.includes("champion") || low.includes("gold")) {
            bg = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700";
        } else if (low.includes("2nd") || low.includes("silver") || low.includes("runner up")) {
            bg = "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600";
        } else if (low.includes("3rd") || low.includes("bronze")) {
            bg = "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700";
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${bg}`}>
                <Trophy className="w-3 h-3" />
                {award}
            </span>
        );
    };

    return (
        <>
            <Head title="Competition Management" />
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-dark dark:text-light tracking-tight">
                                Hall of Fame <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Competitions</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Manage competition stories, hackathons, awards, and uploaded media.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/HallOfFame"
                                target="_blank"
                                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-sm font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Public Page
                            </Link>
                            <Link
                                href={route("competitions.create")}
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-purple hover:bg-purple/90 shadow-lg hover:shadow-purple/50 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <Plus className="w-5 h-5 mr-1.5" />
                                Add Competition
                            </Link>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20 bg-purple/5 dark:bg-purple/20">
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Media</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Title & Event</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Award / Placement</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {competitions.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30 text-purple" />
                                                <p className="text-base font-semibold">No competition entries yet.</p>
                                                <p className="text-sm mt-1">Click "Add Competition" to publish your first competition story or achievement.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        competitions.map((comp) => (
                                            <tr
                                                key={comp.id}
                                                className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-200"
                                            >
                                                {/* Media Thumbnail */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 relative group/thumb">
                                                        {comp.media_path ? (
                                                            comp.media_type === "video" ? (
                                                                <div className="relative w-full h-full">
                                                                    <video
                                                                        src={comp.media_path}
                                                                        className="w-full h-full object-cover"
                                                                        muted
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                                        <Video className="w-4 h-4 text-white" />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={comp.media_path}
                                                                    alt={comp.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            )
                                                        ) : (
                                                            <ImageIcon className="w-5 h-5 text-gray-400" />
                                                        )}
                                                        {comp.gallery && comp.gallery.length > 0 && (
                                                            <span className="absolute bottom-1 right-1 z-10 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur text-white text-[9px] font-bold">
                                                                +{comp.gallery.length}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Title & Competition Name */}
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 dark:text-white text-base">
                                                        {comp.title}
                                                    </div>
                                                    <div className="text-xs text-purple font-semibold mt-0.5">
                                                        {comp.competition_name}
                                                    </div>
                                                    {comp.team_members && (
                                                        <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                                            <Users className="w-3 h-3 shrink-0" />
                                                            <span>{comp.team_members}</span>
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Award */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {comp.award ? (
                                                        getAwardBadge(comp.award)
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">None specified</span>
                                                    )}
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {comp.category ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple/10 text-purple border border-purple/20">
                                                            {comp.category}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                                        comp.status === "active"
                                                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                                                            : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600"
                                                    }`}>
                                                        {comp.status === "active" ? "Active" : "Inactive"}
                                                    </span>
                                                </td>

                                                {/* Event Date */}
                                                <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {comp.event_date
                                                            ? new Date(comp.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                                            : new Date(comp.created_at).toLocaleDateString()}
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Link
                                                            href={route("competitions.edit", comp.id)}
                                                            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(comp.id)}
                                                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
