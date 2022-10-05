<?php

namespace App\Http\Controllers;

use App\Events\TestEvent;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function status($authUserName, $authUserStatus): \Illuminate\Broadcasting\PendingBroadcast
    {
        return $authUserStatus === 'online'
            ? broadcast(new TestEvent("$authUserName is online!"))->toOthers()
            : broadcast(new TestEvent("$authUserName is offline!"))->toOthers();
    }
}
