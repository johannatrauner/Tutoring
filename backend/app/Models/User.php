<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'study_program',
        'role', //giver, seeker
        'description',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function subjects() : HasMany
    {
        return $this->hasMany(Subject::class, 'tutor_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->id,
            ],
        ];
    }

    public function tutorSessions(): HasMany
    {
        return $this->hasMany(TutoringSession::class, 'tutor_id');
    }

    public function seekerSessions(): HasMany
    {
        return $this->hasMany(TutoringSession::class, 'seeker_id');
    }

    public function tutorRequests(): HasMany
    {
        return $this->hasMany(RequestSession::class, 'tutor_id');
    }

    public function seekerRequests(): HasMany
    {
        return $this->hasMany(RequestSession::class, 'seeker_id');
    }
}
