<?php

namespace App\Models\Concern\Channel;

use App\Models\Channel;

trait BelongsChannel
{
    public function channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }
}
