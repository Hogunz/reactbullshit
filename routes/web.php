<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\BSCSTesti;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::resource('bscstestimonials', BSCSTestimonialController::class);

Route::get('/Contact', function(){
    return Inertia::render("EnrollNow");
});
Route::get('/ProgramDescription', function(){
    return Inertia::render("ProgramDescription");
});
Route::get('/Faculty', function(){
    return Inertia::render("FacultyPage");
});
Route::get('/Events', function(){
    return Inertia::render("Events");
});
Route::get('/VMO', function(){
    return Inertia::render("VMO");
});
Route::get('/Instructors', function(Request $request){

    return Inertia::render("Faculty", [
        'instructor' => $request->instructor,
    ]);
});
Route::get('/Blogs', function(Request $request){

    return Inertia::render("Blog", [
        'blog' => $request->blog,
    ]);
});
Route::get('/Program', function(Request $request){
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

require __DIR__.'/auth.php';
