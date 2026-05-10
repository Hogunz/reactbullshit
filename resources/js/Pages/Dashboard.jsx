import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Dashboard({ auth, siteSettings }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        show_sneak_peek: siteSettings?.show_sneak_peek || 'false',
        sneak_peek_title: siteSettings?.sneak_peek_title || 'Student Work Sneak Peek',
        sneak_peek_subtitle: siteSettings?.sneak_peek_subtitle || 'Get ready to experience the incredible game and web applications developed by our Programming 2 and Web Tech students.',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Site Settings</h3>
                            <form onSubmit={submit} className="space-y-6 max-w-xl">
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-purple-600 shadow-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:focus:ring-offset-gray-800"
                                            checked={data.show_sneak_peek === 'true'}
                                            onChange={(e) => setData('show_sneak_peek', e.target.checked ? 'true' : 'false')}
                                        />
                                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Show "Sneak Peek" Section on Homepage</span>
                                    </label>
                                </div>
                                
                                {data.show_sneak_peek === 'true' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Sneak Peek Section Title
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-purple-500 dark:focus:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600 rounded-md shadow-sm"
                                                value={data.sneak_peek_title}
                                                onChange={(e) => setData('sneak_peek_title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Sneak Peek Section Subtitle
                                            </label>
                                            <textarea
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-purple-500 dark:focus:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600 rounded-md shadow-sm"
                                                rows="3"
                                                value={data.sneak_peek_subtitle}
                                                onChange={(e) => setData('sneak_peek_subtitle', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        Save Settings
                                    </button>

                                    {recentlySuccessful && <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
