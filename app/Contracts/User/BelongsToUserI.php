<?php

namespace App\Contracts\User;

interface BelongsToUserI
{
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo;
}
