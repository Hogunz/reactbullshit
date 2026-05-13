<?php

namespace Database\Seeders;

use App\Models\ProgramShowcase;
use App\Models\ProgramCategory;
use Illuminate\Database\Seeder;

class Top30SampleSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure categories exist for samples
        $categories = [
            ['program' => 'MMA', 'name' => '3D Animation'],
            ['program' => 'WMAD', 'name' => 'Mobile Apps'],
            ['program' => 'NICS', 'name' => 'Network Security'],
            ['program' => 'CSE', 'name' => 'Artificial Intelligence'],
        ];

        foreach ($categories as $cat) {
            ProgramCategory::firstOrCreate($cat);
        }

        // Add Sample Winners
        $samples = [
            [
                'program' => 'MMA',
                'title' => 'Aether Sentinel',
                'category' => '3D Animation',
                'media_path' => '/storage/showcase/mma_sample.png',
                'media_type' => 'image',
                'is_top_30' => true,
            ],
            [
                'program' => 'WMAD',
                'title' => 'Pulse Dashboard',
                'category' => 'Mobile Apps',
                'media_path' => '/storage/showcase/wmad_sample.png',
                'media_type' => 'image',
                'is_top_30' => true,
            ],
            [
                'program' => 'NICS',
                'title' => 'Global Core Defense',
                'category' => 'Network Security',
                'media_path' => '/storage/showcase/nics_sample.png',
                'media_type' => 'image',
                'is_top_30' => true,
            ],
            [
                'program' => 'CSE',
                'title' => 'Neural Net Viz',
                'category' => 'Artificial Intelligence',
                'media_path' => '/storage/showcase/cse_sample.png',
                'media_type' => 'image',
                'is_top_30' => true,
            ],
        ];

        foreach ($samples as $sample) {
            ProgramShowcase::create($sample);
        }
    }
}
