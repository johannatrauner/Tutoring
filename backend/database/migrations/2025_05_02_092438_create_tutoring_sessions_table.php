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
        Schema::create('tutoring_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seeker_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('topic_id')->constrained('topics')->onDelete('cascade');
            $table->string('status')->default('offering'); // offering, booked
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->string('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutoring_sessions');
    }
};
