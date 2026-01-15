<?php

namespace App\Http\Controllers;

use App\Models\ProgramAttribute;
use App\Models\ProgramCategory;
use App\Models\ProgramShowcase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShowcaseController extends Controller
{
    public function edit($program)
    {
        // Valid programs: MMA, NICS, WMAD
        if (!in_array($program, ['MMA', 'NICS', 'WMAD'])) {
            abort(404);
        }

        $videoAttribute = ProgramAttribute::where('program', $program)
            ->where('type', 'VIDEO_PATH')
            ->first();

        $galleryItems = ProgramShowcase::where('program', $program)
            ->get();

        $categories = ProgramCategory::where('program', $program)->get();

        return Inertia::render('admin/specializations/Showcase', [
            'program' => $program,
            'video' => $videoAttribute ? $videoAttribute->content : null,
            'galleryItems' => $galleryItems,
            'categories' => $categories,
        ]);
    }

    public function updateVideo(Request $request, $program)
    {
        $request->validate([
            'video' => 'required|mimetypes:video/mp4,video/quicktime|max:512000', // 500MB max
        ]);

        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('videos', 'public');

            ProgramAttribute::updateOrCreate(
                ['program' => $program, 'type' => 'VIDEO_PATH'],
                ['content' => '/storage/' . $path]
            );
        }

        return redirect()->back()->with('success', 'Video updated successfully.');
    }

    public function storeGalleryItem(Request $request, $program)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,qt|max:512000', // 50MB max, renamed 'image' to 'file'
        ]);

        $file = $request->file('file');
        $mimeType = $file->getMimeType();
        $isVideo = str_contains($mimeType, 'video');
        $mediaType = $isVideo ? 'video' : 'image';

        $path = $file->store('showcase', 'public');

        ProgramShowcase::create([
            'program' => $program,
            'title' => $request->title,
            'category' => $request->category,
            'media_path' => '/storage/' . $path,
            'media_type' => $mediaType,
        ]);

        return redirect()->back()->with('success', 'Gallery item added successfully.');
    }

    public function destroyGalleryItem($id)
    {
        $item = ProgramShowcase::findOrFail($id);
        
        // delete file from storage if needed
        // Storage::disk('public')->delete(str_replace('/storage/', '', $item->image_path));

        $item->delete();

        return redirect()->back()->with('success', 'Gallery item deleted successfully.');
    }

    public function storeCategory(Request $request, $program)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProgramCategory::create([
            'program' => $program,
            'name' => $request->name,
        ]);

        return redirect()->back()->with('success', 'Category added successfully.');
    }

    public function destroyCategory($id)
    {
        $category = ProgramCategory::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
