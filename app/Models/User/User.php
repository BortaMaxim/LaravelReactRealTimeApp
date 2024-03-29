<?php

namespace App\Models\User;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Channel\Channel;
use App\Models\Message\Message;
use App\Models\Relationships\Channel\BelongsToManyChannels;
use App\Models\Relationships\Channel\BelongsToManyChannelsI;
use App\Models\Relationships\Detail\HasOneDetail;
use App\Models\Relationships\Detail\HasOneDetailI;
use App\Models\Relationships\Message\Messages2;
use App\Models\Relationships\Message\Messages2I;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as IResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, IResetPassword, BelongsToManyChannelsI, HasOneDetailI, Messages2I
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword, BelongsToManyChannels, HasOneDetail, Messages2;
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    public function getPresenceChannelUsers(User $user,  $channelId)
    {
        if ($channelId == 1) {
            return $user;
        } else {
            return static::where('id', $user->id)
                ->whereHas('channels', fn($q) => $q->where('channel_id', $channelId))
                ->first();
        }
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
