<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateChannelRequest;
use App\Models\Channel\Channel;
use App\Models\Detail\Detail;
use App\Models\Invite\Invite;
use App\Models\User\User;
use App\Notifications\NotificationRequest;
use App\Services\AcceptRequest\AcceptServicesRequest;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function createChannel(CreateChannelRequest $request)
    {
        $request->validated();
        $userId = auth()->user()->id;

        $channel = new Channel();
        $channel->type = 'channel';
        $channel->name = $request->channel_name;
        $channel->save();
        $channelId = $channel->id;
        $channel->users()->attach($userId);

        $detail = new Detail();
        $detail->name = $request->detail_name;
        $detail->desc = $request->detail_desc;
        $detail->visible = $request->detail_visible;
        $detail->type = $request->detail_type;
        $detail->owner_id = $userId;
        $detail->channel_id = $channelId;
        $detail->image = 'default.jpg';
        $detail->save();

        $createdChannel = Channel::where('channels.id', $channelId)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select('channels.id', 'channels.name', 'details.owner_id as owner_id')->first();

        return response()->json($createdChannel);
    }

    public function deleteChannel($channelId)
    {
        $userId = auth()->user()->id;
        $detail = Detail::where('channel_id', $channelId)->first();
        $channel = Channel::find($channelId);

        if ($detail->owner_id === $userId) {
            $channel->delete();
            $detail->delete();

            return response()->json([
                'modify' => true,
                'message' => 'Channel deleted!'
            ]);
        } else {
            return response()->json('Error', 400);
        }

    }

    public function joinChannel(Request $request, $channelId)
    {
        $userId = auth()->user()->id;
        $channelWithData = Channel::where('channels.type', 'channel')
            ->where('channels.id', $channelId)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select(
                'channels.id',
                'channels.type as channel_type',
                'channels.name',
                'details.desc',
                'details.type as detail_type',
                'details.visible',
                'details.owner_id',
            )->first();

        if ($channelWithData->detail_type === 'public') {
            foreach ($channelWithData->users as $user) {
                if ($user->id === $userId) {
                    return response()->json("You have been added to the channel - $channelWithData->name", 201);
                }
            }
            $channelWithData->users()->attach($userId);
            return response()->json('Success!');
        } else {
            $invite = new Invite();
            $invite->type = "JOIN";
            $invite->from_id = $userId;
            $invite->to_id = $request->receiver;
            $invite->save();

            $inviteJoin = Invite::where('invites.id', $invite->id)
                ->join('users', 'invites.from_id', '=', 'users.id')
                ->join('details', 'invites.to_id', '=', 'details.channel_id')
                ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 'invites.type', 'details.name as recv_name')
                ->first();
            $owner = User::where('id', $channelWithData->owner_id)->first();
            $owner->notify(new NotificationRequest($inviteJoin));
            return response()->json("Join Request Sent");
        }
    }

    public function getChannelUsers($channelId)
    {
        return Channel::where('type', 'channel')->where('id', $channelId)->with(['users'])->get();
    }

    public function inviteToChannel(Request $request)
    {
        $userId = auth()->user()->id;
        $invite = new Invite();
        $invite->type = 'INVT';
        $invite->from_id = $userId;
        $invite->to_id = $request->receiver;
        $invite->save();

        $inviteJoin = Invite::where('invites.id', $invite->id)
            ->join('details', 'invites.from_id', '=', 'details.channel_id')
            ->join('users', 'details.owner_id', '=', 'users.id')
            ->select(
                'users.name',
                'invites.id',
                'invites.from_id',
                'invites.to_id',
                'invites.type',
                'details.name as recv_name'
            )->first();
        $receiver = User::where('id', $request->receiver)->first();
        $receiver->notify(new NotificationRequest($inviteJoin));
        return response()->json('Invite Sent Successfully');
    }

    public function createInvite(Request $request)
    {
        $userId = auth()->user()->id;
        $invite = new Invite();
        $invite->type = 'FRND';
        $invite->from_id = $userId;
        $invite->to_id = $request->receiver;
        $invite->save();

        $inviteJoin = Invite::where('invites.id', $invite->id)
            ->join('users', 'invites.from_id', '=', 'users.id')
            ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 'invites.type')->first();

        $receiver = User::find($request->receiver);
        $receiver->notify(new NotificationRequest($inviteJoin));

        return response()->json("Invite sent");
    }

    public function acceptRequest(AcceptServicesRequest $acceptServicesRequest, $inviteId)
    {
        $userId = auth()->user()->id;
        $invite = Invite::where('id', $inviteId)->first();

        switch ($invite->type) {
            case 'FRND':
                $channel = $acceptServicesRequest->acceptFriendRequest($invite, $userId);
                return response()->json($channel);
                break;
            case 'JOIN':
                $channel = $acceptServicesRequest->acceptJoinRequest($invite);
                return response()->json($channel);
                break;
            case 'INVT':
                $channel = $acceptServicesRequest->acceptInviteRequest($invite);
                return response()->json($channel);
                break;
            default:
                break;
        }
    }

    public function getNotifications()
    {
        $output['notifications'] = auth()->user()->notifications()->limit(7)->get(['data', 'read_at', 'id']);
        $output["unread_count"] = auth()->user()->unreadNotifications()->count();
        return response()->json($output);
    }

    public function getAllNotifications()
    {
        return response()->json(auth()->user()->notifications()->get(['data', 'read_at', 'id']));
    }

    public function markNotificationAsRead($id)
    {
        auth()->user()->unreadNotifications()->find($id)->markAsRead();
        return response()->json(auth()->user()->notifications()->where('id', $id)->get(['data', 'read_at', 'id']));
    }

    public function deleteNotification($id)
    {
        $currentNotification = auth()->user()->notifications()->where('id', $id)->first();
        $currentNotification->delete();
        return response()->json('Deleted!');
    }

    public function getAllChannels()
    {
        $channels = Channel::where('channels.type', 'channel')
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->join('users', 'users.id', '=', 'details.owner_id')
            ->select(
                'channels.id',
                'channels.type',
                'channels.name',
                'users.name as owner',
                'details.desc',
                'details.type',
                'details.visible',
                'details.owner_id')->get();
        return response()->json($channels);

    }

    public function getOneChannel($channelId)
    {
        $channel = Channel::where("channels.type", "channel")
            ->where('channels.id', $channelId)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select(
                'channels.id',
                'channels.type',
                'channels.name',
                'details.desc',
                'details.owner_id',
                'details.type as detail_type',
                'details.visible');
        $activeChannel = $channel->with(['users'])->first();
        return response()->json([
            'modify' => false,
            'data' => $activeChannel
        ]);
    }

//    public function getSubscribedChannels()
//    {
//        $user = auth()->user()->id;
//        $channels = Channel::whereHas('users', function ($q) use ($user) {
//            $q->where('user_id', $user);
//        })->join('details', 'channels.id', '=', 'details.channel_id')
//            ->join('users', 'users.id', '=', 'details.owner_id')
//            ->join('user_details', 'user_id', '=', 'details.owner_id')
//            ->select(
//                'channels.id',
//                'channels.type',
//                'details.name',
//                'users.name as owner',
//                'details.desc',
//                'details.type',
//                'details.visible',
//                'details.owner_id as owner_id',
////                'user_details.avatar as owner_avatar'
//            )->get();
//        return response()->json($channels);
//    }
}
