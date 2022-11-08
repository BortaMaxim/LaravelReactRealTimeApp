<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Contracts\Channel\BelongsToManyChannelsI;
use App\Contracts\Details\HasOneDetailI;
use App\Contracts\Message\HasManyMessagesI;
use App\Models\Concern\Channel\BelongsToManyChannels;
use App\Models\Concern\Detail\HasOneDetail;
use App\Models\Concern\Message\HasManyMessage;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\CanResetPassword as IResetPassword;

class User extends Authenticatable implements MustVerifyEmail, IResetPassword, BelongsToManyChannelsI, HasOneDetailI, HasManyMessagesI
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword, BelongsToManyChannels, HasOneDetail, HasManyMessage;

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    public function sentMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Message::class, 'recipient_id');
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
