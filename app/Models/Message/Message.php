<?php

namespace App\Models\Message;

use App\Models\Relationships\User\BelongsToUser;
use App\Models\Relationships\User\BelongsToUserI;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Message extends Model implements BelongsToUserI
{
    use HasFactory, SoftDeletes, BelongsToUser;

    protected $guarded = [];
    protected $hidden = ['created_at', 'updated_at'];

    function scopeTo($query, User $to)
    {
        return $query->where('recipient_id', $to->id);
    }

    function scopeFrom($query, User $from)
    {
        return $query->where('sender_id', $from->id);
    }

    function scopeRead($query)
    {
        $now = Carbon::now()->format('Y-m-d H:i:s');
        $copy = $query;
        $copy->update(["read" => $now]);
        return $query;
    }
}
