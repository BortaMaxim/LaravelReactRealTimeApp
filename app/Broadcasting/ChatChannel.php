<?php

namespace App\Broadcasting;

use App\Models\Channel\Channel;
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

    public function join(User $user, $channelId)
    {
        $channelUsers = $user->channels->toArray();
        $foundedChannel = array_search($channelId, array_column($channelUsers, 'id', 'id'));
        return $foundedChannel == $channelId;

//        if($channelId == 1) {
//            return $user;
//        } else {
//            return User::where('id', $user->id)
//                ->whereHas('channels', fn($q) => $q->where('channel_id', $channelId))
//                ->first();
//        }
    }
}
