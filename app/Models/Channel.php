<?php

namespace App\Models;

use App\Contracts\User\BelongsToManyUsersI;
use App\Models\Concern\User\BelongsToManyUsers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model implements BelongsToManyUsersI
{
    use HasFactory, BelongsToManyUsers;
    protected $guarded = [];

    public static function findOrNew($sender, $receiver)
    {
        $channelsFound = Channel::where('type', 'dm')
            ->whereHas('users', fn($q) => $q->where('user_id', $sender))
            ->whereHas('users', fn($q) => $q->where('user_id', $receiver))
            ->get();
    }
}
