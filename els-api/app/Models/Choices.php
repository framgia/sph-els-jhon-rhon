<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Choices extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function word() {
        return $this->belongsTo(Words::class);
    }

    public function answers() {
        return $this->hasMany(Answers::class);
    }
}
