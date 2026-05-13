<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('program_showcases', function (Blueprint $table) {
            $table->string('top_30_category')->nullable()->after('is_top_30'); // 'game' or 'website'
        });
    }

    public function down(): void
    {
        Schema::table('program_showcases', function (Blueprint $table) {
            $table->dropColumn('top_30_category');
        });
    }
};
