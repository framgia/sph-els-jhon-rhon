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
        Schema::table('choices', function(Blueprint $table) {
            $table->dropForeign(['words_id']);
            $table->dropColumn(['words_id']);
            $table->foreignId('word_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('choices', function(Blueprint $table) {
            $table->dropForeign(['word_id']);
            $table->dropColumn(['word_id']);
            $table->foreignId('words_id')->constrained()->cascadeOnDelete();
        });
    }
};
