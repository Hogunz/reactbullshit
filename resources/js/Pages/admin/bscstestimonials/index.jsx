import { NavBar } from "@/Components/NavBar";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Index({ bscstestimonials }) {
    const { delete: destroy } = useForm({});

    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            destroy(route("bscstestimonials.forceDelete", id));
        }
    }

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
                            Testimonial <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Management</span>
                        </h1>
                        <Link
                            href={route("bscstestimonials.create")}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-full text-white bg-purple hover:bg-purple/90 shadow-lg hover:shadow-purple/50 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Add New Testimonial
                        </Link>
                    </div>

                    {/* Glass Table Container */}
                    <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20 bg-purple/5 dark:bg-purple/20">
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Position</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-5 text-sm font-bold dark:text-light uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {bscstestimonials.map((testimonial) => (
                                        <tr
                                            key={testimonial.id}
                                            className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                #{testimonial.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-white">
                                                {testimonial.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                {testimonial.position}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                {new Date(testimonial.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-3">
                                                    {/* <Link
                                                        href={route("bscstestimonials.show", testimonial.id)}
                                                        className="text-gray-500 hover:text-purple dark:text-gray-400 dark:hover:text-purple transition-colors"
                                                        title="View"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                    </Link> */}
                                                    <Link
                                                        href={route("bscstestimonials.edit", testimonial.id)}
                                                        className="text-blue-500 hover:text-blue-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(testimonial.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {bscstestimonials.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No testimonials found.
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
