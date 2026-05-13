<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_showcase_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_showcase_id')
                  ->constrained('program_showcases')
                  ->onDelete('cascade');
            $table->string('media_path');
            $table->string('media_type')->default('image'); // 'image' or 'video'
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_showcase_images');
    }
};
