<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateChannelRequest;
use App\Models\Channel;
use App\Models\Details;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChannelController extends Controller
{
    public function createChannel(CreateChannelRequest $request)
    {
        $userId = auth()->user()->id;

        $request->validated();
        $channel = new Channel();
        $channel->type = $request->channel_type;
        $channel->name = $request->channel_name;
        $channel->save();

        $channelId = $channel->id;
        $channel->users()->attach($userId);

        $detail = new Details();
        $detail->name = $request->detail_name;
        $detail->desc = $request->detail_desc;
        $detail->visible = $request->detail_visible;
        $detail->type = $request->detail_type;
        $detail->owner_id = $userId;
        $detail->channel_id = $channelId;
        $detail->save();

        $createdChannel = Channel::where('channels.id', $channelId)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select('channels.id', 'details.name', 'details.owner_id as owner_id')
            ->first();
        return response()->json($createdChannel);
    }

    public function getAllChannels()
    {
        $channels = Channel::where('channels.type', 'channel')
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->join('users', 'users.id', '=', 'details.owner_id')
            ->select('channels.id', 'channels.type', 'details.name', 'users.name as owner', 'details.desc', 'details.type', 'details.visible', 'details.owner_id')
            ->distinct()->get();
        return response()->json($channels);
    }


}
