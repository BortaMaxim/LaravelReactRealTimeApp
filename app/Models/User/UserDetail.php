<?php

namespace App\Models\User;

use App\Models\Relationships\User\BelongsToUser;
use App\Models\Relationships\User\BelongsToUserI;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model implements BelongsToUserI
{
    use HasFactory, BelongsToUser;

    protected $fillable = ['avatar', 'desc'];
}
