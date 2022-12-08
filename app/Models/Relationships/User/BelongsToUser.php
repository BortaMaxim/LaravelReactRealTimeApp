<?php

namespace App\Models\Relationships\User;

use App\Models\User\User;

trait BelongsToUser
{
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
