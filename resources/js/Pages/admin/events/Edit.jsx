import InputLabel from "@/Components/InputLabel";
import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
export default function Edit({ events }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        // Converts "2026-10-10 10:00:00" to "2026-10-10T10:00"
        return dateString.replace(' ', 'T').slice(0, 16);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const { data, setData, post, processing, errors } = useForm({
        name: events.name,
        category: events.category || "News",
        status: events.status || "active",
        start_time: formatDate(events.start_time || events.created_at),
        end_time: formatDate(events.end_time),
        image: "",
        content: events.content,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("events.update", events.id));
    }
    return (
        <>
            <NavBar />
            <div className="py-12 pt-24">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg max-w-5xl mx-auto">
                    <div className="border-b border-gray-200 bg-white p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Edit News / Event / Announcement</h2>
                            <p className="text-sm text-gray-500">You can adjust the announcement or event date/time to reflect when it actually occurred.</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputLabel>Title</InputLabel>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <InputLabel>Category</InputLabel>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData("category", e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="News">News</option>
                                        <option value="Event">Event</option>
                                        <option value="Announcement">Announcement</option>
                                    </select>
                                    {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                                </div>
                                <div>
                                    <InputLabel>Status</InputLabel>
                                    <select
                                        name="status"
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status}</p>}
                                </div>
                            </div>

                            {/* Flexible Date & Time section */}
                            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 dark:bg-purple-900/10 dark:border-purple-800/30 mb-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                                            {data.category === 'Event' ? 'Event Schedule' : 'Announcement & Publication Date'}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {data.category === 'Event' 
                                                ? 'Set when the event starts and ends.' 
                                                : 'Adjust the date and time if this announcement occurred on a different day.'}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData("start_time", getCurrentDateTime())}
                                        className="text-xs text-purple-600 hover:text-purple-800 font-semibold underline self-start sm:self-auto"
                                    >
                                        Set to Current Time
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel>
                                            {data.category === 'Event' ? 'Start Date & Time' : 'Date & Time'}
                                        </InputLabel>
                                        <input
                                            type="datetime-local"
                                            name="start_time"
                                            value={data.start_time}
                                            onChange={(e) => setData("start_time", e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        {errors.start_time && <p className="text-xs text-red-500 mt-1">{errors.start_time}</p>}
                                    </div>
                                    <div>
                                        <InputLabel>
                                            {data.category === 'Event' ? 'End Date & Time (Optional)' : 'End / Expiry Date (Optional)'}
                                        </InputLabel>
                                        <input
                                            type="datetime-local"
                                            name="end_time"
                                            value={data.end_time}
                                            onChange={(e) => setData("end_time", e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        {errors.end_time && <p className="text-xs text-red-500 mt-1">{errors.end_time}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <InputLabel>Image (Leave blank to keep current)</InputLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                ></input>
                            </div>
                            <div className="mb-2">
                                <InputLabel>Content</InputLabel>
                                <JoditEditor
                                    name="content"
                                    value={data.content}
                                    onChange={(newContent) =>
                                        setData("content", newContent)
                                    }
                                    cols={30}
                                    rows={10}
                                    required
                                ></JoditEditor>
                            </div>
                            <div className="mb-2">
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
