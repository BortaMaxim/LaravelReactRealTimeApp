<?php

namespace App\Broadcasting;

use App\Models\User\User;

class UserChannel
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
    public function join(User $user, $channelId): bool|array
    {
        return $user->id == $channelId;
    }
}
