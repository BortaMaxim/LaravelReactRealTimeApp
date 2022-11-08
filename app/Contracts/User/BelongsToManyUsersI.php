<?php

namespace App\Contracts\User;

interface BelongsToManyUsersI
{
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany;
}
