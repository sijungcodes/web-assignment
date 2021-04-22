<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFulltextIndexToBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add fulltext index to books table
        DB::statement('ALTER TABLE `books` ADD FULLTEXT INDEX book_title_index (title)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('books', function($table) {
            $table->dropIndex('book_title_index');
        });
        Schema::dropIfExists('properties');
    }
}
