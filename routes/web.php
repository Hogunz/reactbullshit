<?php

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\BSCSTestimonial;
use App\Http\Controllers\BSCSTesti;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BSCSTestimonialController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ProgramAttributeController;
use App\Models\Faculty;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $bscstestimonials = BSCSTestimonial::all();
    $events = Event::where('status', 'active')->orderBy('created_at', 'desc')->get();
    $faculties = Faculty::orderBy('row_number')->orderBy('sort_order')->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'bscstestimonials' => $bscstestimonials,
        'events' => $events,
        'faculties' => $faculties,
    ]);
});

// ... (omitted lines)

Route::get('/Faculty', function () {
    $faculties = Faculty::with('user')->orderBy('row_number')->orderBy('sort_order')->get();
    return Inertia::render('FacultyPage', [
        'faculties' => $faculties,
    ]);
});
//bscstestimonials
Route::resource('bscstestimonials', BSCSTestimonialController::class)->except(['update']);
Route::post('bscstestimonials/{bscstestimonial}', [BSCSTestimonialController::class, 'update'])->name('bscstestimonials.update');

//SoftDelete
Route::delete('bscstestimonials/forceDelete/{bscstestimonial}', [BSCSTestimonialController::class, 'forceDelete'])->name('bscstestimonials.forceDelete');

//Events
Route::resource('events', EventController::class)->except(['update']);
Route::post('events/{event}', [EventController::class, 'update'])->name('events.update');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

//Faculties
//Faculties
Route::post('faculties/reorder', [FacultyController::class, 'reorder'])->name('faculties.reorder');
Route::resource('faculties', FacultyController::class)->except(['update']);
Route::post('faculties/{faculty}', [FacultyController::class, 'update'])->name('faculties.update');
Route::get('/faculties/{faculty}', [FacultyController::class, 'show'])->name('faculties.show');

Route::get('/Faculty', function () {
    $faculties = Faculty::with('user')->orderBy('row_number')->orderBy('sort_order')->get();
    return Inertia::render('FacultyPage', [
        'faculties' => $faculties,
    ]);
});

// Program Attributes (Admin)
Route::resource('program-attributes', ProgramAttributeController::class);

Route::get('/News&Events', function () {
    $events = Event::where('status', 'active')->with('user')->orderBy('created_at', 'desc')->get();
    return Inertia::render('Events', [
        'events' => $events,
    ]);
});
Route::get('/Contact', function () {
    return Inertia::render("EnrollNow");
});
Route::get('/ProgramDescription', function () {
    return Inertia::render("ProgramDescription");
});

Route::get('/VMO', function () {
    return Inertia::render("VMO");
});


use App\Models\ProgramAttribute;
use App\Models\ProgramCategory;
use App\Http\Controllers\ShowcaseController;
use App\Models\ProgramShowcase;

// Admin Specialization Routes
Route::get('admin/specializations/{program}', [ShowcaseController::class, 'edit'])->name('admin.specializations.edit');
Route::post('admin/specializations/{program}/video', [ShowcaseController::class, 'updateVideo'])->name('admin.specializations.update-video');
Route::post('admin/specializations/{program}/gallery', [ShowcaseController::class, 'storeGalleryItem'])->name('admin.specializations.store-gallery');
Route::delete('admin/specializations/gallery/{id}', [ShowcaseController::class, 'destroyGalleryItem'])->name('admin.specializations.destroy-gallery');
Route::post('admin/specializations/{program}/category', [ShowcaseController::class, 'storeCategory'])->name('admin.specializations.store-category');
Route::delete('admin/specializations/category/{id}', [ShowcaseController::class, 'destroyCategory'])->name('admin.specializations.destroy-category');

Route::get('/academics/bsit/MMA', function () {
    $video = ProgramAttribute::where('program', 'MMA')->where('type', 'VIDEO_PATH')->value('content');
    $galleryItems = ProgramShowcase::where('program', 'MMA')->get();
    $categories = ProgramCategory::where('program', 'MMA')->get();
    return Inertia::render("BSITMMA", [
        'video' => $video,
        'galleryItems' => $galleryItems,
        'categories' => $categories
    ]);
});
Route::get('/academics/bsit/WMAD', function () {
    $video = ProgramAttribute::where('program', 'WMAD')->where('type', 'VIDEO_PATH')->value('content');
    $galleryItems = ProgramShowcase::where('program', 'WMAD')->get();
    $categories = ProgramCategory::where('program', 'WMAD')->get();
    return Inertia::render("BSITWMAD", [
        'video' => $video,
        'galleryItems' => $galleryItems,
        'categories' => $categories
    ]);
});
Route::get('/academics/bsit/NICS', function () {
    $video = ProgramAttribute::where('program', 'NICS')->where('type', 'VIDEO_PATH')->value('content');
    $galleryItems = ProgramShowcase::where('program', 'NICS')->get();
    $categories = ProgramCategory::where('program', 'NICS')->get();
    return Inertia::render("BSITNICS", [
        'video' => $video,
        'galleryItems' => $galleryItems,
        'categories' => $categories
    ]);
});

Route::get('/Blogs', function (Request $request) {

    return Inertia::render("Blog", [
        'blog' => $request->blog,
    ]);
});
Route::get('/Program', function (Request $request) {
    // Determine program type from request if possible, or fetch all?
    // Assuming ProgramDescriptions handles selection, we might need all or specific
    $attributes = ProgramAttribute::all(); 
    return Inertia::render("ProgramDescriptions", [
        'program' => $request->program,
        'allAttributes' => $attributes,
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
