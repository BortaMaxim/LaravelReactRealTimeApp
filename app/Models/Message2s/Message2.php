<?php

namespace App\Models\Message2s;

use App\Models\Channel\Channel;
use App\Models\Relationships\User\BelongsToUser;
use App\Models\Relationships\User\BelongsToUserI;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Message2 extends Model implements BelongsToUserI
{

    use HasFactory, SoftDeletes, BelongsToUser;
    protected $fillable = ['message', 'channel_id', 'user_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function scopeRead($query)
    {
        $now = Carbon::now()->format('Y-m-d H:i:s');
        $copy = $query;
        $copy->update(["read" => $now]);
        return $query;
    }
}
