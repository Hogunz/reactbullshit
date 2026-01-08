import { NavBar } from "@/Components/NavBar";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Index({ attributes }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this attribute?")) {
            destroy(route("program-attributes.destroy", id));
        }
    };

    return (
        <>
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-12">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-extrabold text-dark dark:text-light tracking-tight">
                            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Attributes</span>
                        </h1>
                        <Link
                            href={route("program-attributes.create")}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-full text-white bg-purple hover:bg-purple/90 shadow-lg hover:shadow-purple/50 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Add New Attribute
                        </Link>
                    </div>

                    {/* Glass Table Container */}
                    <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20 bg-purple/5 dark:bg-purple/20">
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Program</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Content</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {attributes.map((attribute) => (
                                        <tr
                                            key={attribute.id}
                                            className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-white">
                                                {attribute.program}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple/10 dark:text-light text-purple border border-purple/20">
                                                    {attribute.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-2xl truncate">
                                                {attribute.content}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={route("program-attributes.edit", attribute.id)}
                                                        className="text-blue-500 hover:text-blue-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(attribute.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {attributes.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No program attributes found.
                                            </td>
                                        </tr>
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
