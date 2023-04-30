<?php

namespace App\Events;

use App\Models\User\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OnlineUsers implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public object $users;
    private int $count;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($users, $count)
    {
        $this->users = $users;
        $this->count = $count;
    }

    public function broadcastWith(): array
    {
        return [
            'online-users' => $this->users,
            'online-users-count' => $this->count,
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|PresenceChannel|array
     */
    public function broadcastOn(): Channel|PresenceChannel|array
    {
        return new PrivateChannel('chat');
    }
}
