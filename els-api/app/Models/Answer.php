<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answer extends Model
{
    use HasFactory, SoftDeletes;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function word() {
        return $this->belongsTo(Word::class);
    }

    public function choice() {
        return $this->belongsTo(Choice::class);
    }

    public static function userAnswersChoice($id) {
        return Answer::where('user_id', '=', $id)->get()->map(function ($answer) {
            return $answer->choice;
        });
    }
}
