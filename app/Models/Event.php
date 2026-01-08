<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'name', // Add the name field to the fillable array
        'category',
        'image',
        'content',
        'status',
        'start_time',
        'end_time',
        'user_id',
        // Add any other fields that can be mass assigned here
    ];
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
