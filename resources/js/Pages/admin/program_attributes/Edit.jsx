import React from 'react';
import { NavBar } from "@/Components/NavBar";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, attribute }) {
    const { data, setData, put, processing, errors } = useForm({
        program: attribute.program,
        type: attribute.type,
        content: attribute.content,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('program-attributes.update', attribute.id));
    };

    return (
        <>
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-12">
                {/* Background Elements - copied from Index to maintain premium feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden sm:rounded-3xl">
                        <div className="p-8 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                                    Edit Program Attribute
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update the attribute details.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="program" value="Program (e.g., BSIT, BSCS)" className="dark:text-gray-300" />
                                    <TextInput
                                        id="program"
                                        name="program"
                                        value={data.program}
                                        className="mt-1 block w-full bg-white/50 dark:bg-black/20 border-gray-300 dark:border-white/10 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                                        isFocused={true}
                                        onChange={(e) => setData('program', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.program} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="type" value="Type" className="dark:text-gray-300" />
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-white/10 bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 rounded-xl shadow-sm"
                                    >
                                        <option value="PEO">PEO (Program Educational Objective)</option>
                                        <option value="PO">PO (Program Outcome)</option>
                                        <option value="IO">IO (Institutional Outcome)</option>
                                        <option value="HEI">HEI (Outcome Common to All HEIs)</option>
                                        <option value="PATHFIT">PATHFIT</option>
                                        <option value="ADVOCACY">ADVOCACY (Advocacy and Action)</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Content" className="dark:text-gray-300" />
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-white/10 bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 rounded-xl shadow-sm"
                                        rows="4"
                                        required
                                    ></textarea>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('program-attributes.index')}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="bg-purple hover:bg-purple/90 rounded-xl" disabled={processing}>
                                        Save Changes
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
