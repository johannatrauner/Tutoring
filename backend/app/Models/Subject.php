<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    protected $fillable = [
        'title',
        'description',
        'tutor_id',
    ];

    public function topics() : hasMany
    {
        return $this->hasMany(Topic::class);
    }

    public function tutor() : BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
