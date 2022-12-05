<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('answers', function(Blueprint $table) {
            $table->dropForeign(['users_id']);
            $table->dropForeign(['words_id']);
            $table->dropForeign(['choices_id']);
            $table->dropColumn(['users_id','words_id','choices_id']);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('word_id')->constrained()->cascadeOnDelete();
            $table->foreignId('choice_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('answers', function(Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['word_id']);
            $table->dropForeign(['choice_id']);
            $table->dropColumn(['user_id','word_id','choice_id']);
            $table->foreignId('users_id')->constrained()->cascadeOnDelete();
            $table->foreignId('words_id')->constrained()->cascadeOnDelete();
            $table->foreignId('choices_id')->constrained()->cascadeOnDelete();
        });
    }
};
