import { NavBar } from "@/Components/NavBar";
import { Button } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";

export default function Index({ bscstestimonials }) {
    const { delete: destroy } = useForm({});
    function forceDelete(id) {
        destroy(route("bscstestimonials.forceDelete", id));
    }

    return (
        <>
            <NavBar />
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg pt-24">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-2 flex justify-end">
                        <a
                            href={route("bscstestimonials.create")}
                            className="href"
                        >
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
                            {bscstestimonials.map((bscstestimonial, index) => (
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
                                        {bscstestimonial.created_at}
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        {/* <a
                                            href={route(
                                                "bscstestimonials.show",
                                                {
                                                    id: bscstestimonial.id,
                                                }
                                            )}
                                        >
                                            <Button>show</Button>
                                        </a> */}
                                        <a
                                            href={route(
                                                "bscstestimonials.edit",
                                                { id: bscstestimonial.id },
                                            )}
                                            className="href"
                                        >
                                            <Button>edit</Button>
                                        </a>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                forceDelete(bscstestimonial.id)
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
