<?php

namespace App\Http\Controllers;

use App\Events\SendMessageToChannel;
use App\Helpers\Conversation;
use App\Models\Channel\Channel;
use App\Models\Message2s\Message2;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageToChannelController extends Controller
{
    public function sendMessageTo(Request $request, $channelId)
    {
        $authUser = auth()->user();
        $foundedChannel = Channel::find($channelId);

        $messageCreated = auth()->user()->messages()->create([
            'message' => $request->message2,
            'user' => $authUser,
            'channel_id' => $channelId,
        ]);
        broadcast(new SendMessageToChannel($authUser, $messageCreated, $foundedChannel->type));
    }

    /**
     * @throws \Exception
     */
    public function getMessages(Channel $channel)
    {
        $messages = Message2::where('channel_id', $channel->id)->with('user.details')->get();
        foreach ($messages as $message) {
            $message->read = Carbon::now()->format('Y-m-d H:i:s');
            $message->save();
        }
        return $messages;
    }
}
