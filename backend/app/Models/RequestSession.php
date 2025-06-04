<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestSession extends Model
{
    protected $fillable = [
        'tutor_id',
        'seeker_id',
        'topic_id',
        'status',
        'comment',
        'start_time',
        'end_time',
    ];

    public function topic() : BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }

    public function seeker() : BelongsTo
    {
        return $this->belongsTo(User::class, 'seeker_id');
    }

    public function tutor() : BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

}
