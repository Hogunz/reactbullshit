<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramShowcaseImage extends Model
{
    protected $fillable = [
        'program_showcase_id',
        'media_path',
        'media_type',
        'sort_order',
    ];

    public function showcase()
    {
        return $this->belongsTo(ProgramShowcase::class, 'program_showcase_id');
    }
}
