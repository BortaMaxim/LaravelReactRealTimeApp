<?php

namespace App\Broadcasting;

use App\Models\User\User;

class AcceptRequestChannel
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
     * @param  \App\Models\User\User  $user
     * @return array|bool
     */
    public function join(User $user, $id): bool|array
    {
        return (int)$user->id === (int)$id;
    }
}
