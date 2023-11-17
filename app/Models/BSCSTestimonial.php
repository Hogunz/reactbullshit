<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BSCSTestimonial extends Model
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
    use HasFactory;
}
