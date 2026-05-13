<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramShowcase extends Model
{
    use HasFactory;

    protected $fillable = [
        'program',
        'title',
        'category',
        'is_top_30',
    ];

    /**
     * All media files belonging to this showcase entry.
     */
    public function images()
    {
        return $this->hasMany(ProgramShowcaseImage::class, 'program_showcase_id')
                    ->orderBy('sort_order');
    }

    /**
     * Convenience: first image for grid/preview thumbnails.
     */
    public function getFirstImageAttribute()
    {
        return $this->images->first();
    }
}
