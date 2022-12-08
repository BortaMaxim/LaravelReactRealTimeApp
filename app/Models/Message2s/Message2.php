<?php

namespace App\Models\Message2s;

use App\Models\Relationships\User\BelongsToUser;
use App\Models\Relationships\User\BelongsToUserI;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message2 extends Model implements BelongsToUserI
{
    use HasFactory, SoftDeletes, BelongsToUser;
    protected $fillable = ['message', 'channel_id'];
}
