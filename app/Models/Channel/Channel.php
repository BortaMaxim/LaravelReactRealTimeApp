<?php

namespace App\Models\Channel;

use App\Models\Relationships\User\BelongsToManyUsers;
use App\Models\Relationships\User\BelongsToManyUsersI;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Channel extends Model implements BelongsToManyUsersI
{
    use HasFactory, BelongsToManyUsers;

    public static function getChannel(int $channelId, string $channelType): \Illuminate\Http\JsonResponse
    {
        $channel = static::where("channels.type", $channelType)
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

    protected $fillable = [
        'name'
    ];
    protected $hidden = ['pivot'];
    protected $attributes = [
        'name' => null,
    ];

}
