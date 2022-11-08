<?php

namespace App\Models;

use App\Contracts\User\BelongsToUserI;
use App\Models\Concern\User\BelongsUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model implements BelongsToUserI
{
    use HasFactory, BelongsUser;

    protected $guarded = [];
}
