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
    $events = Event::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'bscstestimonials' => $bscstestimonials,
        'events' => $events,
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


Route::get('/News&Events', function () {
    $events = Event::with('user')->get();
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
Route::get('/Faculty', function () {
    return Inertia::render("FacultyPage");
});

Route::get('/VMO', function () {
    return Inertia::render("VMO");
});
Route::get('/Instructors', function (Request $request) {

    return Inertia::render("Faculty", [
        'instructor' => $request->instructor,
    ]);
});
Route::get('/Blogs', function (Request $request) {

    return Inertia::render("Blog", [
        'blog' => $request->blog,
    ]);
});
Route::get('/Program', function (Request $request) {
    return Inertia::render("ProgramDescriptions", [
        'program' => $request->program,
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
