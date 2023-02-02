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
        $authId = auth()->id();
        $channel = Channel::find($channelId);
        $message = "Please join to channel- $channel->name";
        $channelUsers =  $channel->users;
        foreach ($channelUsers as $user) {
            $currentUser = User::where('id', auth()->user()->id)->with('details')->first();
            if ($user->id === $authId) {
                $message = auth()->user()->messages()->create([
                    'message' => $request->message2,
                    'channel_id' => $channelId,
                ]);
                broadcast(new SendMessageToChannel($currentUser, $message, $channelId, $channel->type));
            }else {
                return response()->json([
                    'success' => false,
                    'message' => $message,
                ]);
            }
        }
    }

    public function getMessages($channelId)
    {

        return Message2::where('channel_id', $channelId)->with('user.details')->get();
    }
}
