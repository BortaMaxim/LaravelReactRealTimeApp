<?php

namespace App\Http\Controllers;

use App\Events\StatusEvent;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function status($authUser, $authUserStatus): \Illuminate\Broadcasting\PendingBroadcast
    {
        return $authUserStatus === 'online'
            ? broadcast(new StatusEvent(  "$authUser->name is online!", $authUser))->toOthers()
            : broadcast(new StatusEvent( "$authUser->name is offline!", $authUser))->toOthers();
    }
}
