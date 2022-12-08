<?php

namespace App\Models\Relationships\User;

interface BelongsToManyUsersI
{
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany;
}
