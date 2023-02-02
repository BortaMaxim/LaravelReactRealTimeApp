<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessageToChannel implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $user;
    protected $message;
    protected $channelId;
    protected $type;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $message, $channelId, $type)
    {
        $this->user = $user;
        $this->message = $message;
        $this->channelId = $channelId ;
        $this->type = $type;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        if ($this->type === 'channel') {
            return new PresenceChannel("chat.channel.".$this->channelId);
        } else if ($this->type === 'dm') {
            return new PresenceChannel("chat.dm.".$this->channelId);
        }
    }
}
