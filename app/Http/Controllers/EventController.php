<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
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
        $events = Event::with('user')
            ->orderByRaw('COALESCE(start_time, created_at) DESC')
            ->get();

        return Inertia::render('admin/events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:News,Event,Announcement',
            'image' => 'required|image',
            'content' => 'required',
            'status' => 'required|in:active,inactive',
            'start_time' => 'nullable|date',
            'end_time' => [
                'nullable',
                'date',
                function ($attribute, $value, $fail) use ($request) {
                    if ($value && $request->filled('start_time')) {
                        if (strtotime($value) < strtotime($request->input('start_time'))) {
                            $fail('The end date and time must be a date after or equal to the start date and time.');
                        }
                    }
                },
            ],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = \Illuminate\Support\Str::random(40) . '.' . $file->getClientOriginalExtension();
            \Illuminate\Support\Facades\Storage::disk('public')->put(
                'events/' . $filename,
                file_get_contents($file->getPathname())
            );
            $validated['image'] = '/storage/events/' . $filename;
        }

        $validated['user_id'] = Auth::id();

        // If a specific start_time is set (e.g., backdated announcement/event), align created_at
        if (!empty($validated['start_time'])) {
            $validated['created_at'] = $validated['start_time'];
        } else {
            $validated['start_time'] = now();
        }

        Event::create($validated);

        return redirect()->route('events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Blog', [
            'events' => $event->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('admin/events/Edit', [
            'events' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:News,Event,Announcement',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'nullable',
            'status' => 'required|in:active,inactive',
            'start_time' => 'nullable|date',
            'end_time' => [
                'nullable',
                'date',
                function ($attribute, $value, $fail) use ($request) {
                    if ($value && $request->filled('start_time')) {
                        if (strtotime($value) < strtotime($request->input('start_time'))) {
                            $fail('The end date and time must be a date after or equal to the start date and time.');
                        }
                    }
                },
            ],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = \Illuminate\Support\Str::random(40) . '.' . $file->getClientOriginalExtension();
            \Illuminate\Support\Facades\Storage::disk('public')->put(
                'events/' . $filename,
                file_get_contents($file->getPathname())
            );
            $validated['image'] = '/storage/events/' . $filename;
        } else {
            unset($validated['image']);
        }

        // If start_time was updated, synchronize created_at so both columns reflect the flexible date
        if (!empty($validated['start_time'])) {
            $validated['created_at'] = $validated['start_time'];
        }

        $event->update($validated);

        return redirect()->route('events.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return redirect()->route('events.index');
    }
}
