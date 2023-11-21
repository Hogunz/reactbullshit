import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";

export default function Index({ events }) {
    const { delete: destroy } = useForm({});
    function handleDelete(id) {
        destroy(route("events.destroy", id));
    }

    return (
        <>
            <NavBar />
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-2 flex justify-end">
                        <a href={route("events.create")} className="href">
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
                                    Title
                                </th>
                                <th class="px-3 py-2 uppercase tracking-tight">
                                    Status
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
                            {events.map((event, index) => (
                                <tr>
                                    <td class="px-3 py-2 text-center">
                                        {event.id}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {event.name}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {event.status}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {event.created_at}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        <a href="">
                                            <Button>show</Button>
                                        </a>
                                        <a
                                            href={route("events.edit", {
                                                id: event.id,
                                            })}
                                            className="href"
                                        >
                                            <Button>edit</Button>
                                        </a>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(event.id)
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
