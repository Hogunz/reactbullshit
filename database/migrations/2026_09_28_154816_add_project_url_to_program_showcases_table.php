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
            $table->string('project_url')->nullable()->after('creator_major');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('program_showcases', function (Blueprint $table) {
            $table->dropColumn('project_url');
        });
    }
};
