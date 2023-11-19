<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BSCSTestimonial extends Model
{
     protected $fillable = [
        'name', // Add the name field to the fillable array
        'image',
        'position',
        'content',
        'start_time',
        'end_time',
        // Add any other fields that can be mass assigned here
    ];
    use HasFactory, SoftDeletes;
}
