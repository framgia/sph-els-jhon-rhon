<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answers extends Model
{
    use HasFactory, SoftDeletes;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function word() {
        return $this->belongsTo(Words::class);
    }

    public function choice() {
        return $this->belongsTo(Choices::class, 'choices_id', 'id');
    }

    public static function userAnswersChoice($id) {
        return Answers::where('users_id', '=', $id)->get()->map(function ($answer) {
            return $answer->choice;
        });
    }
}
