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
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('competition_name');
            $table->string('award')->nullable(); // e.g. Champion, 1st Runner Up, Finalist, or null
            $table->string('category')->nullable(); // e.g. Hackathon, Cybersecurity, Game Development, etc.
            $table->date('event_date')->nullable();
            $table->text('team_members')->nullable(); // comma-separated or text of participants
            $table->string('coach')->nullable(); // Faculty coach / mentor
            $table->longText('content')->nullable(); // Story / summary / write-up
            $table->string('media_type')->default('image'); // 'image' or 'video'
            $table->string('media_path')->nullable(); // uploaded file path
            $table->string('status')->default('active'); // 'active' or 'inactive'
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
