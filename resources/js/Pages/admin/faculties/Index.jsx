import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";

export default function Index({ faculties }) {
    const { delete: destroy } = useForm({});
    function handleDelete(id) {
        destroy(route("faculties.destroy", id));
    }

    return (
        <>
            <NavBar />
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg mx-auto pt-24">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-2 flex justify-end">
                        <a href={route("faculties.create")} className="href">
                            <Button>Create</Button>
                        </a>
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
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map((faculty, index) => (
                                <tr>
                                    <td class="px-3 py-2 text-center">
                                        {faculty.id}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {faculty.name}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {faculty.position}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {faculty.content}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {faculty.created_at}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        <a
                                            href={route("faculties.show", {
                                                id: faculty.id,
                                            })}
                                        >
                                            <Button>show</Button>
                                        </a>
                                        <a
                                            href={route("faculties.edit", {
                                                id: faculty.id,
                                            })}
                                            className="href"
                                        >
                                            <Button>edit</Button>
                                        </a>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(faculty.id)
                                            }
                                        >
                                            Delete
                                        </Button>
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
