<?php

use App\Broadcasting\AcceptRequestChannel;
use App\Broadcasting\BaseChannel;
use App\Broadcasting\ChatChannel;
use App\Broadcasting\ChatDm;
use App\Broadcasting\CreateChannel;
use App\Broadcasting\DeleteChannel;
use App\Broadcasting\JoinToChannel;
use App\Broadcasting\OnlinePublicChatChannel;
use App\Broadcasting\UserChannel;
use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('base-channel', BaseChannel::class);
Broadcast::channel('user-channel.{channelId}', UserChannel::class);
Broadcast::channel('event.acceptRequest.{id}', AcceptRequestChannel::class);
Broadcast::channel('chat.channel.{channel_id}', ChatChannel::class);
Broadcast::channel('chat.dm.{channel_id}', ChatDm::class);
Broadcast::channel('create-channel', CreateChannel::class);
Broadcast::channel('delete-channel', DeleteChannel::class);
Broadcast::channel('join-to-channel.{user_id}', JoinToChannel::class);
Broadcast::channel('online.public.channel.users.{channelId}', OnlinePublicChatChannel::class);
Broadcast::channel('chat', function ($user) {
    if (auth()->check()) {
        return $user;
    };
});
Broadcast::channel('App.Models.User.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
