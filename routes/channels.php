<?php

use App\Broadcasting\BaseChannel;
use App\Broadcasting\UserChannel;
use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('base-channel', BaseChannel::class);
Broadcast::channel('user-channel.{userId}', UserChannel::class);
