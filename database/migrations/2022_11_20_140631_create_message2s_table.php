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
        Schema::create('message2s', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->text('message');
            $table->integer('channel_id')->unsigned();
            $table->dateTime('read')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('message2s');
    }
};
