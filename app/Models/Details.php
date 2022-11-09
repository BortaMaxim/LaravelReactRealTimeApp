<?php

namespace App\Models;

use App\Contracts\Channel\BelongsToChannelI;
use App\Models\Concern\Channel\BelongsChannel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Details extends Model implements BelongsToChannelI
{
    use HasFactory, BelongsChannel;

    protected $fillable = ['name', 'desc', 'visible', 'type'];
}
