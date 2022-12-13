<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function answers() {
        return $this->hasMany(Answer::class);
    }

    public function results() {
        return $this->hasMany(Result::class);
    }

    public function activities() {
        return $this->hasMany(Activities::class);
    }

    public function followings() {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id')->withTimestamps();
    }

    public function followers() {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id')->withTimestamps();
    }

    public function followsActivitable() {
        return $this->morphMany(Activities::class, 'activitable');
    }

    public function followsActivities() {
        return $this->hasMany(Activities::class)->where('activitable_type', '=', User::class);
    }

    public function userFollowingsActivities() {
        return $this->followings->map(function($user) {
            return $user->activities;
        })
        ->filter(function($activity) {
            return $activity->isNotEmpty();
        });
    }
}
