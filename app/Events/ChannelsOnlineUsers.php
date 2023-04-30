<?php

namespace App\Events;

use App\Models\User\User;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Broadcasting\Channel;
use App\Models\Channel\Channel as ChatChannels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class ChannelsOnlineUsers implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private ChatChannels $channel;
    private User $user;


    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($channel, $user)
    {
        $this->user = $user;
        $this->channel = $channel;
    }

    public function broadcastWith(): array
    {
        return [
            'user' => $this->user
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|PresenceChannel|PrivateChannel
     */
    public function broadcastOn()
    {
        if ($this->channel->type === 'channel') {
            return new PrivateChannel('online.public.channel.users.'.$this->channel->id);
        } elseif ($this->channel->type === 'dm') {
            return new PresenceChannel('online.private.channel.users.'.$this->channel->id);
        }
    }
}
