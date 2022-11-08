<?php

namespace App\Contracts\Message;

interface HasManyMessagesI
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany;
}
