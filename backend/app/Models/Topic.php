<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Topic extends Model
{
    protected $fillable = [
        'title',
        'description',
        'subject_id',
    ];

    public function subject() : BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function tutoringSessions() : HasMany
    {
        return $this->hasMany(TutoringSession::class, 'topic_id');
    }

}
