<?php

namespace App\Models\Concern\Message;

use App\Models\Message;

trait HasManyMessage
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message::class);
    }
}
