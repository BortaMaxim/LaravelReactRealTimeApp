<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Repository\AuthRepository\Authable;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

/**
 * @property Authable $authable
 */
class UserController extends Controller
{
//    public $confirm_verified_url = "https://mailtrap.io/inboxes/1897989/messages";
    public function __construct(Authable $authable)
    {
        $this->authable = $authable;
    }

    public function register(RegisterUserRequest $request): \Illuminate\Http\JsonResponse
    {
        return $this->authable->sign_up($request);
    }

    public function login(LoginUserRequest $request): \Illuminate\Http\JsonResponse
    {
        return $this->authable->sign_in($request);
    }

    public function verify(Request $request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        return $this->authable->verify($request);
    }

    public function profile(): ?\Illuminate\Contracts\Auth\Authenticatable
    {
        return $this->authable->profile();
    }

    public function logout(): \Illuminate\Http\JsonResponse
    {
        return $this->authable->logout();
    }

    public function send_reset_link_email_response(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->authable->send_reset_link_email_response($request);
    }

    public function reset_password($token): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        return $this->authable->reset_password($token);
    }

    public function send_reset_response(ResetPasswordRequest $request): \Illuminate\Http\JsonResponse
    {
        return $this->authable->send_reset_response($request);
    }

    public function password_reset_token()
    {
        return Cache::get('reset-token');
    }

    public function updateProfile(UpdateProfileRequest $request): \Illuminate\Http\JsonResponse
    {
        return $this->authable->updateProfile($request);
    }
}
