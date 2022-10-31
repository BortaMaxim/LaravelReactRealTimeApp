<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Message extends Model
{
    use HasFactory, SoftDeletes;

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
