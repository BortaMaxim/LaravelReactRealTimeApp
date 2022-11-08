<?php

namespace App\Models\Concern\User;

use App\Models\User;

trait BelongsUser
{
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
