<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramAttribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'program',
        'type',
        'content',
    ];
}
