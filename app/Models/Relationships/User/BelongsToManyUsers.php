<?php

namespace App\Models\Relationships\User;

use App\Models\User\User;

trait BelongsToManyUsers
{
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_channel')->withTimestamps();
    }
}
