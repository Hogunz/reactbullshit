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
        Schema::create('program_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('program'); // e.g., 'BSIT', 'BSCS'
            $table->string('type'); // 'PEO' or 'PO'
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_attributes');
    }
};
