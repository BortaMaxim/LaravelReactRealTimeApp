<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FriendsController extends Controller
{
    public function friends()
    {
        return User::where('id', '!=', Auth::id())->get();
    }
}
