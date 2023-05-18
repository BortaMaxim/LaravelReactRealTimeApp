<?php

namespace App\Helpers;

use App\Models\Message2s\Message2;
use App\Models\User\User;

class Conversation
{
    public $sender;
    public $recipient;


    /**
     * @throws \Exception
     */
    public function __construct($sender, $recipient)
    {
        if ($recipient->id === $sender->id)
            throw new \Exception("Sender and recipient can't be the same person", 1);

        $this->sender = $sender;
        $this->recipient = $recipient;
    }

    public function messages($amount, $read = false): array
    {
        $sent = $this->sender->sentMessages()
            ->to($this->recipient)
            ->orderBy('created_at', 'desc')
            ->take($amount / 2)->get();

        $received = $this->sender->receivedMessages()
            ->from($this->recipient)
            ->orderBy('created_at', 'desc')
            ->take($amount / 2);

        if ($read === true) {
            $received->read();
        }

        $received = $received->get();
        $messages = $sent->merge($received)->sortByDesc('created_at');
        return array_reverse($messages->values()->toArray());
    }

    public function lastMessage()
    {
        $messages = $this->messages(2);
        return (count($messages) ? $messages[count($messages) - 1] : []);
    }

    public function channelMessages($read = false)
    {
        $sent =
        $channel = Message2::where('channel_id', $this->recipient->id)->with('user.details');
        if ($read === true) {
            $channel->read();
        }
        return $channel->get();
    }
}
