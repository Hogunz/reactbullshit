import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { Person } from "./create";

export default function index() {
    return (
        <>
            <NavBar />
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-2 flex justify-end">
                        <Button>
                            {" "}
                            <a
                                href={route("bscstestimonials.create")}
                                className="href"
                            >
                                Create
                            </a>
                        </Button>
                    </div>
                    <table class="min-w-full table-auto">
                        <thead>
                            <tr class="bg-gray-300">
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    ID
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Name
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Position
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Content
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Date
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Action
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    <span class="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Person.map((bscstestimonial, index) => (
                                <tr>
                                    <td class="px-3 py-2 text-center">
                                        {bscstestimonial.id}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {bscstestimonial.name}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {bscstestimonial.position}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {bscstestimonial.content}
                                    </td>
                                    <td class="px-3 py-2 text-center"></td>
                                    <td class="px-3 py-2 text-center">
                                        <a href="{{ route('categories.show', $category) }}">
                                            <button>show</button>
                                        </a>
                                        <a href="{{ route('categories.edit', $category) }}">
                                            <button>edit</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
