<?php

namespace App\Http\Controllers;

use App\Events\SendMessageToChannel;
use App\Helpers\Conversation;
use App\Models\Channel\Channel;
use App\Models\Message2s\Message2;
use Illuminate\Http\Request;

class MessageToChannelController extends ApiController
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
        $curr_channel = Message2::where('channel_id', $channel->id)->with('user.details');
        $curr_channel->read();
        return $curr_channel->get();
    }

    public function getLast(Channel $channel = null)
    {
        if ($channel) {
            $one_channel =  Channel::find($channel->id);
            $messages = $one_channel->messages()->where('read', '=', null)->get();
            return [$one_channel->id => count($messages) ? $messages[count($messages) - 1]: []];
        }
        $channels = Channel::with(['messages' => function ($query) {
            $query->where('read', '=', null);
        }])->get('id')->keyBy('id');
        return $channels;
    }
}
