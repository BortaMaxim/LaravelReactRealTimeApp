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

class SendMessageToChannel implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $user;
    protected $message;
    protected $channel;
    private $data;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $message, $channel)
    {
        $this->user = $user;
        $this->message = $message;
        $this->channel = $channel;
        $this->message->user = $this->user;
        $this->data = $this->message->toArray();
    }

    public function broadcastWith(): array
    {
        return [
            'data' => $this->data,
            'channel' => $this->channel,
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        if ($this->channel->channel_type === 'channel') {
            return new PrivateChannel("chat.channel." . $this->data['channel_id']);
        } else if ($this->channel->channel_type === 'dm') {
            return new PrivateChannel("chat.dm." . $this->data['channel_id']);
        }
    }
}
