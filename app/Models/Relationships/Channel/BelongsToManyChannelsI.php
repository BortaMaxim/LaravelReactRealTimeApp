<?php

namespace App\Models\Relationships\Channel;

interface BelongsToManyChannelsI
{
    public function channels(): \Illuminate\Database\Eloquent\Relations\BelongsToMany;
}
