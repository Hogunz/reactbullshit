import InputLabel from "@/Components/InputLabel";
import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";


export const Person = [
    {
        id: '',
        name: '',
        position: '',
        image: '',
        content:'',
    },
];
function handleSubmit(e) {
    e.preventDefault();
    post(route("bscstestimonials.store"));
}

export default function bscstestimonials() {
    return (
        <>
            <NavBar />
            <div class="py-12">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="border-b border-gray-200 bg-white p-6">
                        <form onSubmit={handleSubmit}
                            method="post" enctype="multipart/form-data"
                        >
                            <div class="mb-2">
                                <InputLabel>Name</InputLabel>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                ></input>
                            </div>
                            <div class="mb-2">
                                <InputLabel>Image</InputLabel>
                                <input
                                    type="file"
                                    accepts="images/*"
                                    name="image"
                                    required
                                ></input>
                            </div>
                            <div class="mb-2">
                                <InputLabel>Position</InputLabel>
                                <input
                                    type="text"
                                    name="position"
                                    required
                                ></input>
                            </div>
                            <div class="mb-2">
                                <InputLabel>Content</InputLabel>
                                <input
                                    type="text"
                                    name="content"
                                    required
                                ></input>
                            </div>
                            <div class="mb-2">
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}
