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
        Schema::create('request_sessions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('tutor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seeker_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('topic_id')->constrained('topics')->onDelete('cascade');
            $table->string('status')->default('requested'); // requested, accepted, rejected
            $table->string('comment')->nullable();
            $table->timestamp('start_time');
            $table->timestamp('end_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_sessions');
    }
};
