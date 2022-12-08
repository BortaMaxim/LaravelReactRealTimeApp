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
        $channel = Channel::find($channelId);

        $message = auth()->user()->messages()->create([
            'message' => $request->message2,
            'channel_id' => $channelId,
        ]);
        $user = User::where('id', auth()->user()->id)->with('details')->first();
        broadcast(new SendMessageToChannel($user, $message, $channelId, $channel->type));
    }

    public function getMessages($channelId)
    {
        return Message2::where('channel_id', $channelId)->with('user.details')->get();
    }
}
