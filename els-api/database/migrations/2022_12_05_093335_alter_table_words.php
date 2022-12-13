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
        Schema::table('words', function(Blueprint $table) {
            $table->dropForeign(['lessons_id']);
            $table->dropColumn(['lessons_id']);
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
        Schema::table('words', function(Blueprint $table) {
            $table->dropForeign(['lesson_id']);
            $table->dropColumn(['lesson_id']);
            $table->foreignId('lessons_id')->constrained()->cascadeOnDelete();
        });
    }
};
