<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BSITTestimonial extends Model
{
    protected $fillable = [
        'name', // Add the name field to the fillable array
        'image',
        'course',
        'latin',
        'position',
        'place',
        'content',
        'start_time',
        'end_time',
        // Add any other fields that can be mass assigned here
    ];
    use HasFactory, SoftDeletes;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
