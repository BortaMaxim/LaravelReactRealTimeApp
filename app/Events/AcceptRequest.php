<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AcceptRequest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userId;
    public $type;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, $userId, $type)
    {
        $this->message = $message;
        $this->userId = $userId;
        $this->type = $type;
    }
    public function broadcastWith(): array
    {
        return [ '0' => $this->message,
            '1' => $this->type];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|PrivateChannel|array
     */
    public function broadcastOn(): Channel|PrivateChannel|array
    {
        return new PrivateChannel('event.acceptRequest.'.$this->userId);
    }
}
