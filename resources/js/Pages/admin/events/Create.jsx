import InputLabel from "@/Components/InputLabel";
import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        image: "",
        content: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(data);
        post(route("events.store"));
    }

    return (
        <>
            <NavBar />
            <div className="py-12 pt-24">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="border-b border-gray-200 bg-white p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <InputLabel>Title</InputLabel>
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
                                <InputLabel>Image</InputLabel>
                                <input
                                    type="file"
                                    accepts="images/*"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    required
                                ></input>
                            </div>
                            <div className="mb-2">
                                <InputLabel>Content</InputLabel>
                                <JoditEditor
                                    value={data.content}
                                    name="content"
                                    onChange={(newContent) =>
                                        setData("content", newContent)
                                    }
                                    cols={30}
                                    rows={10}
                                    required
                                ></JoditEditor>
                            </div>
                            <div className="mb-2">
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
