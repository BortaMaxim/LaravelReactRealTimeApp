<?php

namespace App\Models\Concern\Channel;

use App\Models\Channel;

trait BelongsChannel
{
    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }
}
