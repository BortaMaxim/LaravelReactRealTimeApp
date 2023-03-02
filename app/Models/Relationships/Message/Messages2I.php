<?php

namespace App\Models\Relationships\Message;

interface Messages2I
{
    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany;
    public function sentMessages2(): \Illuminate\Database\Eloquent\Relations\HasMany;
    public function receivedMessages2(): \Illuminate\Database\Eloquent\Relations\HasMany;
}
