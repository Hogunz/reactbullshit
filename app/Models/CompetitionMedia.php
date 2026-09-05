<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionMedia extends Model
{
    use HasFactory;

    protected $table = 'competition_media';

    protected $fillable = [
        'competition_id',
        'media_path',
        'media_type',
        'sort_order',
        'caption',
    ];

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }
}
