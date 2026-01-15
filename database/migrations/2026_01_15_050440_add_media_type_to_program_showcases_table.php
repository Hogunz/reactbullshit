<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('program_showcases', function (Blueprint $table) {
            $table->string('media_type')->default('image')->after('category'); // 'image' or 'video'
            $table->renameColumn('image_path', 'media_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('program_showcases', function (Blueprint $table) {
            $table->dropColumn('media_type');
            $table->renameColumn('media_path', 'image_path');
        });
    }
};
