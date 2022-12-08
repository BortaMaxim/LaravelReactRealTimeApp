<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Helpers\Conversation;
use App\Http\Requests\SendMessageRequest;
use App\Models\Message\Message;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;

class ConversationController extends ApiController
{

    private Message $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * @throws \Exception
     */
    public function get_messages(User $user)
    {
        $conversation = new Conversation(Auth::user(), $user);
        return response()->json([
            'recipient' => $user,
            'messages' => $conversation->messages(40, true)
        ]);
    }

    public function send_message(SendMessageRequest $request, User $user)
    {
        $request->validated();
        if (!$user) return $this->respondUnprocessable();

        $message = [
            'sender_id' => Auth::id(),
            'recipient_id' => $user->id,
            'message' => $request->message
        ];
        $message = $this->message->create($message);

        broadcast(new MessageEvent($message));
    }

    /**
     * @throws \Exception
     */
    public function last(User $user = null)
    {
        if ($user) {
            $conversation = new Conversation(Auth::user(), $user);
            return $this->respond($conversation->lastMessage());
        }
        $messages = User::where('id', '!=', Auth::id())->get()->mapWithKeys(function ($user) {
            $conversation = new Conversation(Auth::user(), $user);
            return [$user->id => $conversation->lastMessage()];
        });
        return $this->respond($messages);
    }

    public function unread_messages_count()
    {
        $unread_messages_count = $this->message
            ->where('read', null)
            ->where('recipient_id', Auth::id())
            ->get();
        return $unread_messages_count->count();
    }
}
