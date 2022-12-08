<?php

namespace App\Models\Relationships\Message;

use App\Models\Message2s\Message2;

trait HasManyMessages
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message2::class);
    }
}
