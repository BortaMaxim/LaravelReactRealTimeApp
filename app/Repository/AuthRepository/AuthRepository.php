<?php

namespace App\Repository\AuthRepository;

use App\Events\OfflineUsers;
use App\Events\OnlineUsers;
use App\Http\Controllers\Controller;
use App\Models\User\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthRepository extends Controller implements Authable
{
    public User $user;
    public string $confirm_verified_url = "https://mailtrap.io/inboxes/1897989/messages";

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function sign_up($request): \Illuminate\Http\JsonResponse
    {
        $request->validated();
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        $user = $this->user->create($data);
        event(new Registered($user));
        return response()->json([
            'success' => true,
            'message' => 'Register Successfully!  Please confirm your email on ' . $this->confirm_verified_url,
        ]);
    }

    public function sign_in($request): \Illuminate\Http\JsonResponse
    {
        $request->validated();
        $credentials = $request->only('email', 'password');
        $user = $this->user->where('email', $credentials['email'])->first();
        if ($user) {
            if (!auth()->attempt($credentials)) {
                $responseMessage = "Invalid username or password";
                return response()->json([
                    "success" => false,
                    "message" => $responseMessage,
                    "error" => $responseMessage
                ], 422);
            }
            $email_verified = auth()->user()->email_verified_at;
            if ($email_verified === null) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please confirm your email! ' . $this->confirm_verified_url
                ]);
            } else {
                $accessToken = auth()->user()->createToken('accessToken')->accessToken;
                $user->status = 'online';
                $this->status($user->name, $user->status);
                $user->save();

                $responseMessage = "Login Success";
                return response()->json([
                    'success' => true,
                    'message' => $responseMessage,
                    'data' => $user,
                    'token' => $accessToken
                ]);
            }
        } else {
            $responseMessage = "Sorry, this user does not exist";
            return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
            ]);
        }
    }

    public function verify($request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        $user = $this->user->find($request->route('id'));
        $clientUrl = 'http://localhost:8000';

        if ($user->hasVerifiedEmail()) {
            return redirect("$clientUrl/email-already-verified");
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect("$clientUrl/email-verified-success");
    }

    public function profile(): ?\Illuminate\Contracts\Auth\Authenticatable
    {
        $user = auth()->user();
        $user->status = 'online';
        broadcast(new OnlineUsers($user));
        return $user;
    }

    public function logout(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::guard('api')->user()->token();
        $auth_user = auth()->user();
        $auth_user->status = 'offline';
        broadcast(new OfflineUsers($user))->toOthers();

        $auth_user->save();
        $user->revoke();
        $this->status($auth_user->name, $auth_user->status);
        $responseMessage = "Successfully logged out ";
        return response()->json([
            'success' => true,
            'message' => $responseMessage,
        ]);
    }

    public function send_reset_link_email_response($request): \Illuminate\Http\JsonResponse
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(request()->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => 'success'])
            : response()->json(['success' => false, 'message' => 'fail']);
    }

    public function reset_password($token): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        Cache::put('reset-token', $token);
        $url = url('/reset-password');
        return redirect($url);
    }

    public function send_reset_response($request): \Illuminate\Http\JsonResponse
    {
        $request->validated();
        $input = $request->only(['email', 'token', 'password', 'password_confirmation']);
        $response = Password::reset($input, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
        return $response == Password::PASSWORD_RESET
            ? response()->json(['success' => true, 'message' => 'Password reset successfully'])
            : response()->json(['success' => false, 'message' => 'Please write new password']);
    }

    public function updateProfile($request): \Illuminate\Http\JsonResponse
    {
        $request->validated();
        $avatar_request = $request->avatar;
        if ($avatar = $request->file('avatar')) {
            $avatar_name = $avatar_request->getClientOriginalName();
            $avatar->move('avatars', $avatar_name);
        }

        $auth_user = auth()->user();
        $auth_user->name = $request->name;
        $auth_user->email = $request->email;
        $auth_user->avatar = $avatar_name;
        $auth_user->save();

        return response()->json([
            'success' => true,
            'message' => 'user updated!',
            'data' => $auth_user
        ]);
    }
}
