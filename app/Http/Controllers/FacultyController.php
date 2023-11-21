<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FacultyController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faculties = Faculty::get();
        return Inertia::render('admin/faculties/Index', [
            'faculties' => $faculties,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/faculties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image',
            'content' => 'required',
            'position' => 'required',
        ]);

        $imagePath = $request->file('image')->store('public');
        $imageName = basename($imagePath);

        $faculty = new Faculty();
        $faculty->name = $request->input('name');
        $faculty->image = $imageName;
        $faculty->position = $request->input('position');
        $faculty->content = $request->input('content');
        $faculty->user_id = Auth::id();
        $faculty->save();

        return redirect()->route('faculties.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Faculty $faculty)
    {
        return Inertia::render('Faculty', [
            'faculties' => $faculty->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faculty $faculty)
    {
        return Inertia::render('admin/faculties/Edit', [
            'faculty' => $faculty,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faculty $faculty)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'position' => 'nullable',
            'content' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
            $faculty->image = $imagePath;
        }

        $faculty->name = $request->name;
        $faculty->position = $request->input('position');
        $faculty->content = $request->input('content');
        $faculty->save();

        return redirect()->route('faculties.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faculty $faculty)
    {
        $faculty->delete();
        return redirect()->route('faculties.index');
    }
}
