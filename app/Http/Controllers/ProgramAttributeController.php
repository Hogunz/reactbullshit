<?php

namespace App\Http\Controllers;

use App\Models\ProgramAttribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramAttributeController extends Controller
{
    public function index()
    {
        $attributes = ProgramAttribute::all();
        return Inertia::render('admin/program_attributes/Index', [
            'attributes' => $attributes,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/program_attributes/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'program' => 'required|string',
            'type' => 'required|string|in:PEO,PO',
            'content' => 'required|string',
        ]);

        ProgramAttribute::create($request->all());

        return redirect()->route('program-attributes.index')->with('success', 'Attribute created successfully.');
    }

    public function edit(ProgramAttribute $programAttribute)
    {
        return Inertia::render('admin/program_attributes/Edit', [
            'attribute' => $programAttribute,
        ]);
    }

    public function update(Request $request, ProgramAttribute $programAttribute)
    {
        $request->validate([
            'program' => 'required|string',
            'type' => 'required|string|in:PEO,PO',
            'content' => 'required|string',
        ]);

        $programAttribute->update($request->all());

        return redirect()->route('program-attributes.index')->with('success', 'Attribute updated successfully.');
    }

    public function destroy(ProgramAttribute $programAttribute)
    {
        $programAttribute->delete();
        return redirect()->route('program-attributes.index')->with('success', 'Attribute deleted successfully.');
    }
}
