<?php

namespace App\Http\Controllers;

use App\Models\ProgramShowcase;
use App\Models\ProgramShowcaseImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StudentShowcaseAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $showcases = ProgramShowcase::with('images')
            ->orderBy('is_top_30', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/studentshowcase/Index', [
            'showcases' => $showcases,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'           => 'required|string|max:255',
            'program'         => 'nullable|string|max:50',
            'category'        => 'nullable|string|max:100',
            'creator_major'   => 'nullable|string|max:100',
            'is_top_30'       => 'nullable|boolean',
            'top_30_category' => 'nullable|in:game,website',
            'files'           => 'required|array|min:1',
            'files.*'         => 'file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,quicktime|max:512000',
        ], [
            'files.required'  => 'Please upload at least one image or video for this showcase entry.',
            'files.*.max'     => 'Uploaded file cannot exceed 500MB.',
            'files.*.mimes'   => 'Supported formats: JPG, PNG, WebP, GIF, SVG, MP4, WebM, MOV.',
        ]);

        $program = $request->input('program') ?: 'General';
        $isTop30 = $request->boolean('is_top_30');
        $top30Category = $isTop30 ? ($request->input('top_30_category') ?: 'game') : null;

        $showcase = ProgramShowcase::create([
            'title'           => $request->title,
            'program'         => $program,
            'category'        => $request->category,
            'creator_major'   => $request->creator_major,
            'is_top_30'       => $isTop30,
            'top_30_category' => $top30Category,
        ]);

        $firstMediaPath = null;
        $firstMediaType = null;

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $index => $file) {
                if (!$file || !$file->isValid()) continue;

                $mimeType = $file->getMimeType();
                $isVideo = str_starts_with($mimeType, 'video/');
                $ext = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
                $filename = time() . '_' . Str::random(12) . '.' . $ext;

                $file->storeAs('showcase', $filename, 'public');
                $mediaPath = '/storage/showcase/' . $filename;
                $mediaType = $isVideo ? 'video' : 'image';

                if ($index === 0) {
                    $firstMediaPath = $mediaPath;
                    $firstMediaType = $mediaType;
                }

                ProgramShowcaseImage::create([
                    'program_showcase_id' => $showcase->id,
                    'media_path'          => $mediaPath,
                    'media_type'          => $mediaType,
                    'sort_order'          => $index,
                ]);
            }
        }

        if ($firstMediaPath) {
            $showcase->update([
                'media_path' => $firstMediaPath,
                'media_type' => $firstMediaType,
            ]);
        }

        return redirect()->back()->with('success', "Showcase entry \"{$request->title}\" created successfully.");
    }

    public function update(Request $request, int|string $id)
    {
        $showcase = ProgramShowcase::with('images')->findOrFail($id);

        $request->validate([
            'title'           => 'required|string|max:255',
            'program'         => 'nullable|string|max:50',
            'category'        => 'nullable|string|max:100',
            'creator_major'   => 'nullable|string|max:100',
            'is_top_30'       => 'nullable|boolean',
            'top_30_category' => 'nullable|in:game,website',
            'new_files'       => 'nullable|array',
            'new_files.*'     => 'file|mimes:jpeg,png,jpg,webp,gif,svg,mp4,webm,mov,quicktime|max:512000',
        ]);

        $isTop30 = $request->boolean('is_top_30');
        $top30Category = $isTop30 ? ($request->input('top_30_category') ?: 'game') : null;

        $showcase->update([
            'title'           => $request->title,
            'program'         => $request->input('program') ?: ($showcase->program ?: 'General'),
            'category'        => $request->category,
            'creator_major'   => $request->creator_major,
            'is_top_30'       => $isTop30,
            'top_30_category' => $top30Category,
        ]);

        if ($request->hasFile('new_files')) {
            $currentMaxOrder = $showcase->images()->max('sort_order') ?? 0;
            foreach ($request->file('new_files') as $idx => $file) {
                if (!$file || !$file->isValid()) continue;

                $mimeType = $file->getMimeType();
                $isVideo = str_starts_with($mimeType, 'video/');
                $ext = $file->getClientOriginalExtension() ?: ($isVideo ? 'mp4' : 'jpg');
                $filename = time() . '_' . Str::random(12) . '.' . $ext;

                $file->storeAs('showcase', $filename, 'public');
                $mediaPath = '/storage/showcase/' . $filename;
                $mediaType = $isVideo ? 'video' : 'image';

                ProgramShowcaseImage::create([
                    'program_showcase_id' => $showcase->id,
                    'media_path'          => $mediaPath,
                    'media_type'          => $mediaType,
                    'sort_order'          => $currentMaxOrder + $idx + 1,
                ]);
            }
        }

        // Keep showcase primary media path synced
        $firstImage = $showcase->images()->first();
        if ($firstImage) {
            $showcase->update([
                'media_path' => $firstImage->media_path,
                'media_type' => $firstImage->media_type,
            ]);
        }

        return redirect()->back()->with('success', "Showcase entry updated successfully.");
    }

    public function destroy(int|string $id)
    {
        $showcase = ProgramShowcase::with('images')->findOrFail($id);

        foreach ($showcase->images as $img) {
            if ($img->media_path) {
                $relPath = str_replace('/storage/', '', $img->media_path);
                Storage::disk('public')->delete($relPath);
            }
        }

        if ($showcase->media_path) {
            $relPath = str_replace('/storage/', '', $showcase->media_path);
            Storage::disk('public')->delete($relPath);
        }

        $showcase->delete();

        return redirect()->back()->with('success', "Showcase entry deleted successfully.");
    }

    public function destroyImage(int|string $id)
    {
        $image = ProgramShowcaseImage::findOrFail($id);
        $showcaseId = $image->program_showcase_id;

        if ($image->media_path) {
            $relPath = str_replace('/storage/', '', $image->media_path);
            Storage::disk('public')->delete($relPath);
        }

        $image->delete();

        $showcase = ProgramShowcase::find($showcaseId);
        if ($showcase) {
            $nextImg = $showcase->images()->first();
            $showcase->update([
                'media_path' => $nextImg ? $nextImg->media_path : null,
                'media_type' => $nextImg ? $nextImg->media_type : null,
            ]);
        }

        return redirect()->back()->with('success', "Media file deleted successfully.");
    }

    public function toggleTop30(Request $request, int|string $id)
    {
        $showcase = ProgramShowcase::findOrFail($id);
        $showcase->is_top_30 = !$showcase->is_top_30;

        if ($request->has('top_30_category')) {
            $showcase->top_30_category = $request->top_30_category;
        } elseif ($showcase->is_top_30 && !$showcase->top_30_category) {
            $showcase->top_30_category = 'game';
        }

        $showcase->save();

        $statusText = $showcase->is_top_30 ? 'marked as Top 30' : 'removed from Top 30';
        return redirect()->back()->with('success', "\"{$showcase->title}\" {$statusText}.");
    }
}
