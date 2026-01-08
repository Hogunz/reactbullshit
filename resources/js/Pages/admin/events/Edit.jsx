import InputLabel from "@/Components/InputLabel";
import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
export default function Edit({ events }) {
    const { data, setData, post } = useForm({
        name: events.name,
        category: events.category || "News",
        status: events.status || "active",
        start_time: events.start_time || "",
        end_time: events.end_time || "",
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
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="border-b border-gray-200 bg-white p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <InputLabel>Name</InputLabel>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                ></input>
                            </div>
                            <div className="mb-2">
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
                            </div>
                            <div className="mb-2">
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
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <InputLabel>Start Date</InputLabel>
                                    <input
                                        type="datetime-local"
                                        name="start_time"
                                        value={data.start_time}
                                        onChange={(e) => setData("start_time", e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <InputLabel>End Date</InputLabel>
                                    <input
                                        type="datetime-local"
                                        name="end_time"
                                        value={data.end_time}
                                        onChange={(e) => setData("end_time", e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <InputLabel>Image</InputLabel>
                                <input
                                    type="file"
                                    accepts="images/*"
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
