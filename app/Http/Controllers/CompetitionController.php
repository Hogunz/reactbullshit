<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\CompetitionMedia;
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
     * Public Hall of Fame view with full gallery items.
     */
    public function publicIndex()
    {
        $competitions = Competition::where('status', 'active')
            ->with(['user', 'gallery'])
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
        $competitions = Competition::with(['user', 'gallery'])
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
     * Store new competition entry with optional gallery.
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
            'gallery' => 'nullable|array',
            'gallery.*' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,ogg,quicktime|max:102400',
            'status' => 'required|in:active,inactive',
        ], [
            'media.max' => 'The cover file exceeds the 100MB limit.',
            'media.mimes' => 'The cover must be a valid image (JPG, PNG, WebP, GIF, SVG) or video (MP4, WebM, MOV).',
            'gallery.*.max' => 'A gallery file exceeds the 100MB limit.',
            'gallery.*.mimes' => 'Gallery files must be valid images or videos.',
        ]);

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mime = $file->getMimeType();
            $isVideo = str_starts_with($mime, 'video/');
            $extension = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
            $filename = Str::random(40) . '.' . $extension;

            $file->storeAs('competitions', $filename, 'public');

            $validated['media_type'] = $isVideo ? 'video' : 'image';
            $validated['media_path'] = '/storage/competitions/' . $filename;
        }

        $validated['user_id'] = Auth::id();

        $competition = Competition::create($validated);

        // Store gallery items if provided
        if ($request->hasFile('gallery')) {
            $galleryFiles = $request->file('gallery');
            foreach ($galleryFiles as $idx => $gFile) {
                if (!$gFile || !$gFile->isValid()) continue;

                $gMime = $gFile->getMimeType();
                $gIsVideo = str_starts_with($gMime, 'video/');
                $gExt = $gFile->getClientOriginalExtension() ?: ($gIsVideo ? 'mp4' : 'jpg');
                $gFilename = Str::random(40) . '.' . $gExt;

                $gFile->storeAs('competitions/gallery', $gFilename, 'public');

                CompetitionMedia::create([
                    'competition_id' => $competition->id,
                    'media_path' => '/storage/competitions/gallery/' . $gFilename,
                    'media_type' => $gIsVideo ? 'video' : 'image',
                    'sort_order' => $idx,
                ]);
            }
        }

        // If no primary cover was uploaded but gallery items exist, adopt first gallery item as cover
        if (!$competition->media_path) {
            $firstGallery = $competition->gallery()->first();
            if ($firstGallery) {
                $competition->update([
                    'media_path' => $firstGallery->media_path,
                    'media_type' => $firstGallery->media_type,
                ]);
            }
        }

        return redirect()->route('competitions.index')->with('success', 'Competition entry and gallery created successfully.');
    }

    /**
     * Admin edit form.
     */
    public function edit(Competition $competition)
    {
        $competition->load('gallery');

        return Inertia::render('admin/competitions/Edit', [
            'competition' => $competition,
        ]);
    }

    /**
     * Update existing competition entry and append new gallery items.
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
            'gallery' => 'nullable|array',
            'gallery.*' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,ogg,quicktime|max:102400',
            'status' => 'required|in:active,inactive',
        ], [
            'media.max' => 'The cover file exceeds the 100MB limit.',
            'media.mimes' => 'The cover must be a valid image (JPG, PNG, WebP, GIF, SVG) or video (MP4, WebM, MOV).',
            'gallery.*.max' => 'A gallery file exceeds the 100MB limit.',
            'gallery.*.mimes' => 'Gallery files must be valid images or videos.',
        ]);

        if ($request->hasFile('media')) {
            // Remove old cover media if exists
            if ($competition->media_path) {
                $oldPath = str_replace('/storage/', '', $competition->media_path);
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('media');
            $mime = $file->getMimeType();
            $isVideo = str_starts_with($mime, 'video/');
            $extension = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
            $filename = Str::random(40) . '.' . $extension;

            $file->storeAs('competitions', $filename, 'public');

            $validated['media_type'] = $isVideo ? 'video' : 'image';
            $validated['media_path'] = '/storage/competitions/' . $filename;
        }

        $competition->update($validated);

        // Append new gallery items if uploaded
        if ($request->hasFile('gallery')) {
            $currentMaxOrder = $competition->gallery()->max('sort_order') ?? 0;
            $galleryFiles = $request->file('gallery');
            foreach ($galleryFiles as $idx => $gFile) {
                if (!$gFile || !$gFile->isValid()) continue;

                $gMime = $gFile->getMimeType();
                $gIsVideo = str_starts_with($gMime, 'video/');
                $gExt = $gFile->getClientOriginalExtension() ?: ($gIsVideo ? 'mp4' : 'jpg');
                $gFilename = Str::random(40) . '.' . $gExt;

                $gFile->storeAs('competitions/gallery', $gFilename, 'public');

                CompetitionMedia::create([
                    'competition_id' => $competition->id,
                    'media_path' => '/storage/competitions/gallery/' . $gFilename,
                    'media_type' => $gIsVideo ? 'video' : 'image',
                    'sort_order' => $currentMaxOrder + $idx + 1,
                ]);
            }
        }

        // Ensure there is a cover if gallery items exist
        if (!$competition->media_path) {
            $firstGallery = $competition->gallery()->first();
            if ($firstGallery) {
                $competition->update([
                    'media_path' => $firstGallery->media_path,
                    'media_type' => $firstGallery->media_type,
                ]);
            }
        }

        return redirect()->route('competitions.index')->with('success', 'Competition entry updated successfully.');
    }

    /**
     * Delete an individual gallery item.
     */
    public function destroyGalleryItem(int|string $id)
    {
        $item = CompetitionMedia::findOrFail($id);

        if ($item->media_path) {
            $oldPath = str_replace('/storage/', '', $item->media_path);
            Storage::disk('public')->delete($oldPath);
        }

        $item->delete();

        return redirect()->back()->with('success', 'Gallery item deleted successfully.');
    }

    /**
     * Delete competition entry and all its gallery files.
     */
    public function destroy(Competition $competition)
    {
        if ($competition->media_path) {
            $oldPath = str_replace('/storage/', '', $competition->media_path);
            Storage::disk('public')->delete($oldPath);
        }

        foreach ($competition->gallery as $galleryItem) {
            if ($galleryItem->media_path) {
                $gPath = str_replace('/storage/', '', $galleryItem->media_path);
                Storage::disk('public')->delete($gPath);
            }
        }

        $competition->delete();

        return redirect()->route('competitions.index')->with('success', 'Competition entry deleted successfully.');
    }
}
