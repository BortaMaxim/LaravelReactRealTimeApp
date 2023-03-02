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
    protected $type;
    private $data;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $message, $type)
    {
        $this->user = $user;
        $this->message = $message;
        $this->type = $type;
        $this->message->user = $this->user;
        $this->data = $this->message->toArray();
    }

    public function broadcastWith(): array
    {
        return [
            'data' => $this->data,
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        if ($this->type === 'channel') {
            return new PrivateChannel("chat.channel." . $this->message->channel_id);
        } else if ($this->type === 'dm') {
            return new PrivateChannel("chat.dm." . $this->message->channel_id);
        }
    }
}
