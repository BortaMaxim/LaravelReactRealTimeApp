<?php

namespace App\Http\Controllers;

use App\Events\ChannelsOnlineUsers;
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
        $foundedChannel = Channel::where('id', $channelId)->select(
            'channels.id',
            'channels.type as channel_type',
            'channels.name'
        )->with(['users'])->first();
        $messageCreated = auth()->user()->messages()->create([
            'message' => $request->message2,
            'user' => $authUser,
            'channel_id' => intval($channelId),
        ]);

        broadcast(new SendMessageToChannel($authUser, $messageCreated, $foundedChannel));
    }

    /**
     * @throws \Exception
     */
    public function getMessages(Channel $channel)
    {
        $messages = Message2::where('channel_id', $channel->id)->with('user.details')->get();
//        $channelUsers = $channel->getChannel($channel->id, $channel->type);
//        return $channelUsers;
//        $authUser = Auth::user();
        foreach ($messages as $message) {
            $message->read = Carbon::now()->format('Y-m-d H:i:s');
            $message->save();
        }
//
        return $messages;
    }
}
