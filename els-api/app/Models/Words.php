<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Words extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function lesson() {
        return $this->belongsTo(Lessons::class);
    }

    public function choices() {
        return $this->hasMany(Choices::class);
    }
}
