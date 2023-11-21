<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name',
        'image',
        'position',
        'content',
        'start_time',
        'end_time',
    ];
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
