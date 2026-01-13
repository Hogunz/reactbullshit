import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        position: "",
        image: "",
        content: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(data);
        post(route("faculties.store"));
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
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-2">
                                <InputLabel>Image</InputLabel>
                                <input
                                    type="file"
                                    accept="images/*"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    required
                                ></input>
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mb-2">
                                <InputLabel>Position</InputLabel>
                                <input
                                    type="text"
                                    name="position"
                                    onChange={(e) =>
                                        setData("position", e.target.value)
                                    }
                                    required
                                ></input>
                                <InputError message={errors.position} className="mt-2" />
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
                                ></JoditEditor>
                                <InputError message={errors.content} className="mt-2" />
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
