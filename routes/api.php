<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\MessageToChannelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth', 'middleware' => 'cors'], function ($route) {
    Route::post('registration', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::get('email/verify/{id}/{hash}', [UserController::class, 'verify'])
        ->middleware(['signed', 'throttle'])
        ->name('verification.verify');
    Route::post('password/forgot-password', [UserController::class, 'send_reset_link_email_response'])
        ->middleware('guest')->name('password.email');
    Route::get('password/reset/{token}', [UserController::class, 'reset_password'])
        ->middleware('guest')->name('password.reset');
    Route::get('password-reset-token', [UserController::class, 'password_reset_token']);
    Route::post('update-password', [UserController::class, 'send_reset_response'])
        ->middleware('guest')->name('password.update');
    Route::get('online-chat-users', [FriendsController::class, 'onlineChatUser']);

    Route::group(['middleware' => 'auth:api'], function ($route) {
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('profile/update', [UserController::class, 'updateProfile']);
        Route::get('logout', [UserController::class, 'logout']);
        Route::get('friends', [FriendsController::class, 'friends']);
        Route::get('conversation/last', [ConversationController::class, 'last']);
        Route::get('conversation/last/{user}', [ConversationController::class, 'last']);
        Route::get('conversation/{user}', [ConversationController::class, 'get_messages']);
        Route::post('conversation/{user}', [ConversationController::class, 'send_message']);
        Route::get('unread-messages/count', [ConversationController::class, 'unread_messages_count']);

        Route::post('create-channel', [ChannelController::class, 'createChannel']); // done
        Route::delete('delete-channel/{channel_id}', [ChannelController::class, 'deleteChannel']); //done
        Route::post('join-channel/{channel_id}', [ChannelController::class, 'joinChannel']); //done
        Route::post('invite-to-channel', [ChannelController::class, 'inviteToChannel']); //done
        Route::post('make-request', [ChannelController::class, 'createInvite']);///Not yet
        Route::get('accept-invite/{invite_id}', [ChannelController::class, 'acceptRequest']);//not done
        Route::get('notifications', [ChannelController::class, 'getNotifications']); //done
        Route::get('get-one-notification/{id}', [ChannelController::class, 'getOneNotification']); //done
        Route::get('mark-as-read', [ChannelController::class, 'markNotificationAsRead']); //done
        Route::delete('delete-notification/{id}', [ChannelController::class, 'deleteNotification']); //done
        Route::get('get-all-channels', [ChannelController::class, 'getAllChannels']); //done
        Route::get('get-all-private-channels', [ChannelController::class, 'getAllPrivateChannels']); //done
        Route::get('get-channel/{channel_id}', [ChannelController::class, 'getOneChannel']); //done
        Route::get('get-private-channel/{channel_id}', [ChannelController::class, 'getOnePrivateChannel']); //done
        Route::post('send-message-to/{channel_id}', [MessageToChannelController::class, 'sendMessageTo']);
        Route::get('get-message-to/{channel}', [MessageToChannelController::class, 'getMessages']);
        Route::get('get-last-messages', [MessageToChannelController::class, 'getLast']);//not
        Route::get('get-last-messages/{channel}', [MessageToChannelController::class, 'getLast']);//not
        Route::get('get-friend-list', [FriendsController::class, 'getFriendList']);///Not yet
    });
});

