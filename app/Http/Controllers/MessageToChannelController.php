<?php

namespace App\Http\Controllers;

use App\Events\SendMessageToChannel;
use App\Models\Channel\Channel;
use App\Models\Message2s\Message2;
use App\Models\User\User;
use Illuminate\Http\Request;

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

    public function getMessages($channelId)
    {

        return Message2::where('channel_id', $channelId)->with('user.details')->get();
    }
}
