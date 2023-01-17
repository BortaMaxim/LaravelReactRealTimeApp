<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use App\Models\Channel\Channel as CurrentChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeleteChannelEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public CurrentChannel $channel;
    public string $message;
    public bool $modify;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($channel, $message, $modify)
    {
        $this->channel = $channel;
        $this->message = $message;
        $this->modify = $modify;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn(): Channel|PrivateChannel|array
    {
        return new PrivateChannel('delete-channel');
    }
}
