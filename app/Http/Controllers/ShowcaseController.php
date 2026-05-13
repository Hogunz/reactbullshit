<?php

namespace App\Http\Controllers;

use App\Models\ProgramAttribute;
use App\Models\ProgramCategory;
use App\Models\ProgramShowcase;
use App\Models\ProgramShowcaseImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowcaseController extends Controller
{
    public function edit($program)
    {
        if (!in_array($program, ['MMA', 'NICS', 'WMAD', 'CSE'])) {
            abort(404);
        }

        $videoAttribute = ProgramAttribute::where('program', $program)
            ->where('type', 'VIDEO_PATH')
            ->first();

        $galleryItems = ProgramShowcase::where('program', $program)
            ->with('images')
            ->get();

        $categories = ProgramCategory::where('program', $program)->get();

        return Inertia::render('admin/specializations/Showcase', [
            'program'      => $program,
            'video'        => $videoAttribute ? $videoAttribute->content : null,
            'galleryItems' => $galleryItems,
            'categories'   => $categories,
        ]);
    }

    public function updateVideo(Request $request, $program)
    {
        $request->validate([
            'video' => 'required|mimetypes:video/mp4,video/quicktime|max:512000',
        ]);

        if ($request->hasFile('video')) {
            $file     = $request->file('video');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path     = $file->storeAs('videos', $fileName, 'public');

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
            'title'    => 'required|string',
            'category' => 'nullable|string',
            'files'    => 'required|array|min:1',
            'files.*'  => 'file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,qt|max:512000',
        ]);

        // One showcase entry for this title/category
        $showcase = ProgramShowcase::create([
            'program'         => $program,
            'title'           => $request->title,
            'category'        => $request->category,
            'is_top_30'       => $request->boolean('is_top_30'),
            'top_30_category' => $request->top_30_category, // 'game' or 'website'
            'creator_major'   => $request->creator_major,
        ]);

        // Attach every uploaded file as a child image row
        foreach ($request->file('files') as $index => $file) {
            $mimeType  = $file->getMimeType();
            $isVideo   = str_contains($mimeType, 'video');
            $fileName  = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
            $path      = $file->storeAs('showcase', $fileName, 'public');

            ProgramShowcaseImage::create([
                'program_showcase_id' => $showcase->id,
                'media_path'          => '/storage/' . $path,
                'media_type'          => $isVideo ? 'video' : 'image',
                'sort_order'          => $index,
            ]);
        }

        $count = count($request->file('files'));
        $label = $count === 1 ? '1 image' : "{$count} images";

        return redirect()->back()->with('success', "Entry \"{$request->title}\" added with {$label}.");
    }

    public function destroyGalleryItem($id)
    {
        // Child images are cascade-deleted by the DB foreign key constraint
        ProgramShowcase::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Gallery item deleted successfully.');
    }

    public function storeCategory(Request $request, $program)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProgramCategory::create([
            'program' => $program,
            'name'    => $request->name,
        ]);

        return redirect()->back()->with('success', 'Category added successfully.');
    }

    public function destroyCategory($id)
    {
        ProgramCategory::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    public function toggleTop30(Request $request, $id)
    {
        $item            = ProgramShowcase::findOrFail($id);
        $item->is_top_30 = !$item->is_top_30;
        
        if ($request->has('top_30_category')) {
            $item->top_30_category = $request->top_30_category;
        }
        
        $item->save();

        return redirect()->back()->with('success', 'Top 30 status updated.');
    }
}
