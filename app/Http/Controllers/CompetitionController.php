<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompetitionController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->except(['publicIndex']);
    }

    /**
     * Public Hall of Fame view.
     */
    public function publicIndex()
    {
        $competitions = Competition::where('status', 'active')
            ->with('user')
            ->orderByRaw('COALESCE(event_date, created_at) DESC')
            ->get();

        return Inertia::render('HallOfFame', [
            'competitions' => $competitions,
        ]);
    }

    /**
     * Admin listing.
     */
    public function index()
    {
        $competitions = Competition::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/competitions/Index', [
            'competitions' => $competitions,
        ]);
    }

    /**
     * Admin create form.
     */
    public function create()
    {
        return Inertia::render('admin/competitions/Create');
    }

    /**
     * Store new competition entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'competition_name' => 'required|string|max:255',
            'award' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'team_members' => 'nullable|string',
            'coach' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,ogg,quicktime|max:102400',
            'status' => 'required|in:active,inactive',
        ], [
            'media.max' => 'The uploaded file exceeds the 100MB limit.',
            'media.mimes' => 'The media file must be a valid image (JPG, PNG, WebP, GIF, SVG) or video (MP4, WebM, MOV).',
        ]);

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mime = $file->getMimeType();
            $isVideo = str_starts_with($mime, 'video/');
            $extension = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
            $filename = Str::random(40) . '.' . $extension;

            Storage::disk('public')->putFileAs('competitions', $file, $filename);

            $validated['media_type'] = $isVideo ? 'video' : 'image';
            $validated['media_path'] = '/storage/competitions/' . $filename;
        }

        $validated['user_id'] = Auth::id();

        Competition::create($validated);

        return redirect()->route('competitions.index')->with('success', 'Competition entry created successfully.');
    }

    /**
     * Admin edit form.
     */
    public function edit(Competition $competition)
    {
        return Inertia::render('admin/competitions/Edit', [
            'competition' => $competition,
        ]);
    }

    /**
     * Update existing competition entry.
     */
    public function update(Request $request, Competition $competition)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'competition_name' => 'required|string|max:255',
            'award' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'team_members' => 'nullable|string',
            'coach' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,ogg,quicktime|max:102400',
            'status' => 'required|in:active,inactive',
        ], [
            'media.max' => 'The uploaded file exceeds the 100MB limit.',
            'media.mimes' => 'The media file must be a valid image (JPG, PNG, WebP, GIF, SVG) or video (MP4, WebM, MOV).',
        ]);

        if ($request->hasFile('media')) {
            // Remove old media if exists
            if ($competition->media_path) {
                $oldPath = str_replace('/storage/', '', $competition->media_path);
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('media');
            $mime = $file->getMimeType();
            $isVideo = str_starts_with($mime, 'video/');
            $extension = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
            $filename = Str::random(40) . '.' . $extension;

            Storage::disk('public')->putFileAs('competitions', $file, $filename);

            $validated['media_type'] = $isVideo ? 'video' : 'image';
            $validated['media_path'] = '/storage/competitions/' . $filename;
        }

        $competition->update($validated);

        return redirect()->route('competitions.index')->with('success', 'Competition entry updated successfully.');
    }

    /**
     * Delete competition entry.
     */
    public function destroy(Competition $competition)
    {
        if ($competition->media_path) {
            $oldPath = str_replace('/storage/', '', $competition->media_path);
            Storage::disk('public')->delete($oldPath);
        }

        $competition->delete();

        return redirect()->route('competitions.index')->with('success', 'Competition entry deleted successfully.');
    }
}
