<?php

namespace App\Broadcasting;

use App\Models\User\User;

class ChatChannel
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
     * @return User|array|bool
     */
    public function join(User $user, $channelId): User|bool|array
    {
        if($channelId == 1) {
            return $user;
        } else {
            return User::where('id', $user->id)
                ->whereHas('channels', fn($q) => $q->where('channel_id', $channelId))
                ->first();
        }
    }
}
