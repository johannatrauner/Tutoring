<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TutoringSession extends Model
{
    protected $fillable = [
        'tutor_id',
        'seeker_id',
        'topic_id',
        'status',
        'start_time',
        'end_time',
        'comment',
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function seeker() : BelongsTo
    {
        return $this->belongsTo(User::class, 'seeker_id');
    }

    public function topic() : BelongsTo
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }
}
