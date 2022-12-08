<?php

namespace App\Models\Relationships\Channel;

use App\Models\Channel\Channel;

trait BelongsToManyChannels
{
    public function channels(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Channel::class, 'user_channel')->withTimestamps();
    }
}
