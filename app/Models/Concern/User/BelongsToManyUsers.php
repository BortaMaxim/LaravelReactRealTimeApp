<?php

namespace App\Models\Concern\User;

use App\Models\User;

trait BelongsToManyUsers
{
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_channel')->withTimestamps()->select('name', 'id');
    }
}
