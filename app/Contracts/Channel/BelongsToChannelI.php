<?php

namespace App\Contracts\Channel;

interface BelongsToChannelI
{
    public function channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo;
}
