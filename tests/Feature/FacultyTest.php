<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Faculty;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class FacultyTest extends TestCase
{
    use DatabaseTransactions;
    
    public function test_faculty_can_be_created_with_image()
    {
        Storage::fake('public');
        
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post(route('faculties.store'), [
            'name' => 'Test Faculty',
            'position' => 'Professor',
            'content' => 'Test Content',
            'image' => UploadedFile::fake()->image('faculty.jpg'),
        ]);
        
        $response->assertRedirect(route('faculties.index'));
        
        $faculty = Faculty::latest()->first();
        $this->assertEquals('Test Faculty', $faculty->name);
        // Assert path contains 'faculties/'
        $this->assertStringContainsString('faculties/', $faculty->image);
        Storage::disk('public')->assertExists($faculty->image);
    }
    
    public function test_faculty_can_be_updated_with_new_image()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        
        // Create initial
        $image1 = UploadedFile::fake()->image('old.jpg');
        $path1 = $image1->store('faculties', 'public');
        
        $faculty = Faculty::create([
            'name' => 'Old Name',
            'position' => 'Old Pos',
            'content' => 'Old Content',
            'image' => $path1,
            'user_id' => $user->id
        ]);
        
        $response = $this->actingAs($user)->put(route('faculties.update', $faculty->id), [
            'name' => 'New Name',
            'position' => 'New Pos',
            'content' => 'New Content',
            'image' => UploadedFile::fake()->image('new.jpg'),
        ]);
        
        $response->assertRedirect(route('faculties.index'));
        
        $faculty->refresh();
        $this->assertEquals('New Name', $faculty->name);
        $this->assertStringContainsString('faculties/', $faculty->image);
        $this->assertNotEquals($path1, $faculty->image);
        Storage::disk('public')->assertExists($faculty->image);
    }
}
