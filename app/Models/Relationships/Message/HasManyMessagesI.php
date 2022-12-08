<?php

namespace App\Models\Relationships\Message;

interface HasManyMessagesI
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany;
}
