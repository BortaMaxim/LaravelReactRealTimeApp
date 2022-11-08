<?php

namespace App\Contracts\Channel;

interface BelongsToManyChannelsI
{
    public function channels(): \Illuminate\Database\Eloquent\Relations\BelongsToMany;
}
