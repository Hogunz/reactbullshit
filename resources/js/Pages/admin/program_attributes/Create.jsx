
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        program: '',
        type: 'PEO',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('program-attributes.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Program Attribute</h2>}
        >
            <Head title="Create Attribute" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="program" value="Program (e.g., BSIT, BSCS)" />
                                    <TextInput
                                        id="program"
                                        name="program"
                                        value={data.program}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('program', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.program} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="type" value="Type" />
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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

                                <div className="mt-4">
                                    <InputLabel htmlFor="content" value="Content" />
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        required
                                    ></textarea>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('program-attributes.index')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
