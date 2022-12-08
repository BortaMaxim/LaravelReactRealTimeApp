<?php

namespace App\Models\Relationships\User;

interface BelongsToUserI
{
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo;
}
