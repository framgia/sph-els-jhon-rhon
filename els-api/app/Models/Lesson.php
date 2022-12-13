<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function words() {
        return $this->hasMany(Word::class);
    }

    public function results() {
        return $this->hasMany(Result::class);
    }
}
