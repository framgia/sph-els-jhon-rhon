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
        Schema::table('results', function(Blueprint $table) {
            $table->dropForeign(['users_id']);
            $table->dropForeign(['lessons_id']);
            $table->dropColumn(['users_id','lessons_id']);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('results', function(Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['lesson_id']);
            $table->dropColumn(['user_id','lesson_id']);
            $table->foreignId('users_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lessons_id')->constrained()->cascadeOnDelete();
        });
    }
};
