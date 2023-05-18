<?php

namespace App\Models\Relationships\Message;

use App\Models\Message\Message;
use App\Models\Message2s\Message2;

trait Messages2
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message2::class);
    }

    public function sentMessages2(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message2::class, 'user_id');
    }

    public function receivedMessages2(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message2::class, 'channel_id');
    }

    public function sentMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message::class, 'recipient_id');
    }
}
