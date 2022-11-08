<?php

namespace App\Models;

use App\Contracts\User\BelongsToUserI;
use App\Models\Concern\User\BelongsUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Message extends Model implements BelongsToUserI
{
    use HasFactory, SoftDeletes, BelongsUser;

    protected $guarded = [];

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
        $now = Carbon::now();
        $copy = $query;
        $copy->update(["read" => $now]);
        return $query;
    }
}
