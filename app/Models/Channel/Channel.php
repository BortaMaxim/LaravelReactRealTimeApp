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

    protected $fillable = [
        'name'
    ];
    protected $hidden = ['pivot'];
    protected $attributes = [
        'name' => null,
    ];

}
