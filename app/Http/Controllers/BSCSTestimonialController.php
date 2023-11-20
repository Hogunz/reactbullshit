<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use App\Models\BSCSTestimonial;
use Illuminate\Support\Facades\Auth;

class BSCSTestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bscstestimonials = BSCSTestimonial::withTrashed()->get();
        return Inertia::render('admin/bscstestimonials/Index', [
            'bscstestimonials' => $bscstestimonials,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('admin/bscstestimonials/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image',
            'position' => 'required',
            'content' => 'required',
        ]);

        $imagePath = $request->file('image')->store('public');
        $imageName = basename($imagePath);

        $bscstestimonial = new BSCSTestimonial;
        $bscstestimonial->name = $request->input('name');
        $bscstestimonial->image = $imageName;
        $bscstestimonial->position = $request->input('position');
        $bscstestimonial->content = $request->input('content');

        $bscstestimonial->user_id = Auth::id();
        $bscstestimonial->save();

        return redirect()->route('bscstestimonials.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function show(BSCSTestimonial $bscstestimonial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function edit(BSCSTestimonial $bscstestimonial)
    {
        return Inertia::render('admin/bscstestimonials/Edit', [
            'bscstestimonial' => $bscstestimonial,
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BSCSTestimonial $bscstestimonial)
    {
        //  dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'position' => 'nullable',
            'content' => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
            $bscstestimonial->image = $imagePath;
        }

        $bscstestimonial->name = $request->name;
        $bscstestimonial->position = $request->input('position');
        $bscstestimonial->content = $request->input('content');
        $bscstestimonial->save();

        return redirect()->route('bscstestimonials.index');
    }

    public function restore($bscstestimonial)
    {
        BSCSTestimonial::withTrashed()->find($bscstestimonial)->restore();

        return redirect()->route('bscstestimonials.index')->with('status', 'Testimonial Successfully restored');
    }
    public function destroy(BSCSTestimonial $bscstestimonial)
    {
        $bscstestimonial->delete();
        return redirect()->route('bscstestimonials.index')->with('status', 'Testimonial Successfully deleted');
    }
    public function forceDelete(BSCSTestimonial $bscstestimonial)
    {
        $bscstestimonial->forceDelete();

        return redirect()->route('bscstestimonials.index')->with('status', 'Successfully Deleted');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
}
