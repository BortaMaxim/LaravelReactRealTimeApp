<?php

namespace App\Models\Concern\Channel;

use App\Models\Channel;

trait BelongsToManyChannels
{
    public function channels(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Channel::class, 'user_channel');
    }
}
