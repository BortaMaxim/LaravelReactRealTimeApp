<?php

namespace App\Broadcasting;

use App\Models\User\User;

class OnlinePublicChatChannel
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
        $channelUsers = $user->channels->toArray();
        $foundedChannel = array_search($channelId, array_column($channelUsers, 'id', 'id'));
        return $foundedChannel == $channelId;
    }
}
