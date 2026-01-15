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
        'media_path',
        'media_type',
    ];
}
