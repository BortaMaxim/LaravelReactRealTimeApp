<?php

namespace App\Http\Controllers;

use App\Events\OnlineUsers;
use App\Models\Channel\Channel;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;

class FriendsController extends Controller
{
    public function friends()
    {
        return User::where('id', '!=', Auth::id())->get();
    }

    public function getFriendList()
    {
        $sender = auth()->user()->id;

        $friends = Channel::where('type', 'dm')
            ->with(['users' => fn($q) => $q->where('user_channel.id', '!=', $sender)])
            ->whereHas('users', fn($q) => $q->where('user_channel.user_id', $sender))
            ->get();
        return response()->json($friends);
    }

    public function onlineChatUser()
    {
        $onlineUsers = User::where('status', '=', 'online')->get();
        $onlineUsersCount = $onlineUsers->count();
//        broadcast(new OnlineUsers($onlineUsers, $onlineUsersCount));
        return response()->json([
            'online_users' => $onlineUsers,
            'online_users_count' => $onlineUsersCount,
        ]);
    }
}
