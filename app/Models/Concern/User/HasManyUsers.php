<?php

namespace App\Models\Concern\User;

use App\Models\User;

trait HasManyUsers
{
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
