<?php

namespace App\Broadcasting;

use App\Models\Channel\Channel;
use App\Models\Invite\Invite;
use App\Models\User\User;

class AcceptRequestChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function join($invite, $id): bool|array
    {
        return (int)$invite->id === (int)$id;
    }
}
