import { NavBar } from "@/Components/NavBar";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Edit({ partner }) {
    const { data, setData, post, processing, errors } = useForm({
        name: partner.name,
        logo: null,
        description: partner.description || "",
    });
    
    const [preview, setPreview] = useState(partner.logo);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("partners.update", partner.id));
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setData("logo", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <>
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 pb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                
                <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-dark dark:text-light mb-8">
                        Edit Partner
                    </h1>
                    
                    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-dark text-dark dark:text-light focus:border-purple focus:ring-purple"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-dark text-dark dark:text-light focus:border-purple focus:ring-purple"
                                    rows="4"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Logo (Leave blank to keep current)</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="w-full text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition-all"
                                    accept="image/*"
                                />
                                {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                                {preview && (
                                    <div className="mt-4">
                                        <img src={preview} alt="Preview" className="h-32 object-contain" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <a
                                    href={route("partners.index")}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-purple text-white rounded-full text-sm font-bold hover:bg-purple/90 disabled:opacity-50 transition-colors"
                                >
                                    Update Partner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
