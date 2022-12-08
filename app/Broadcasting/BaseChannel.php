<?php

namespace App\Broadcasting;

use App\Models\User\User;

class BaseChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param \App\Models\User\User $user
     * @return User
     */
    public function join(User $user): User
    {
        return $user;
    }
}
