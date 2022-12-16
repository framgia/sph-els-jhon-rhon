<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Word extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function lesson() {
        return $this->belongsTo(Lesson::class);
    }

    public function choices() {
        return $this->hasMany(Choice::class);
    }

    public function answers() {
        return $this->hasMany(Answer::class);
    }
}
