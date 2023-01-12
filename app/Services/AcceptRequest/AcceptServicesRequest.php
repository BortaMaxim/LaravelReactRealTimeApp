<?php

namespace App\Services\AcceptRequest;

use App\Events\AcceptRequest;
use App\Models\Channel\Channel;
use App\Models\Detail\Detail;
use App\Models\Invite\Invite;
use App\Models\User\User;

class AcceptServicesRequest
{
    public function acceptFriendRequest(Invite $invite, int $userId)
    {
        $sender = $invite->from_id;
        $receiver = $invite->to_id;

        $channelIsFound = Channel::where('type', 'dm')
            ->whereHas('users', fn($q) => $q->where('user_id', $sender))
            ->whereHas('users', fn($q) => $q->where('user_id', $receiver))
            ->first();

        if (!empty($channelIsFound)) {
            $channel = $channelIsFound;
            $channel->users = $channel->users;
            broadcast(new AcceptRequest($channel, $sender, 'FRND'));

            return $channel;

        } else {
            $channel = new Channel();
            $channel->name = 'dm1';
            $channel->type = 'dm';
            $channel->save();
            $channel->users()->attach($sender);
            $channel->users()->attach($receiver);
            $channel->users = $channel->users;

            $senderObject = User::where('id', '=', $sender)->first();

            $receiverObject = User::where('id', '=', $receiver)->first();

            $channel->users[0] = $receiverObject;
            return $channel;
        }
    }

    public function acceptJoinRequest(Invite $invite)
    {
        $user = $invite->from_id;
        $privateChannel = $invite->to_id;

        $channelWithDataNew = Channel::where('channels.id', $privateChannel)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select('channels.id as id',
                'channels.type',
                'details.name',
                'details.desc',
                'details.type',
                'details.visible',
                'details.owner_id as owner_id')
            ->first();
        $channel = $channelWithDataNew;
        $details = Detail::where('channel_id', $privateChannel)->first();
        $channel->users()->attach($user);
        broadcast(new AcceptRequest($channel, $user, 'JOIN'));
        return $channel;
    }

    public function acceptInviteRequest(Invite $invite)
    {
        $channelId = $invite->from_id;
        $userId = $invite->to_id;

        $channel = Channel::where('channels.id', $channelId)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->join('users', 'users.id', '=', 'details.owner_id')
            ->select('channels.id as id',
                'channels.type',
                'channels.name as channel_name',
                'details.name',
                'users.name as owner',
                'details.desc',
                'details.type',
                'details.visible',
                'details.owner_id as owner_id')
            ->first();
        foreach ($channel->users as $user) {
            if ($user->id === $userId) {
                return response()->json("You have been added to the channel $channel->channel_name");
            }
        }
        $channel->users()->attach($userId);
        broadcast(new AcceptRequest($channel, $invite->id, 'INVT'));
        return response()->json('Join successfully!');
    }
}
