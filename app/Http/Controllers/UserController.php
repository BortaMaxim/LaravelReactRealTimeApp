<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public $user;
    public $confirm_verified_url = "https://mailtrap.io/inboxes/1897989/messages";
    public function __construct()
    {
        $this->user = new User();
    }

    public function register(RegisterUserRequest $request)
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

    public function login(LoginUserRequest $request)
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
                    'message' => 'Please confirm your email! '. $this->confirm_verified_url
                ]);
            } else {
                $accessToken = auth()->user()->createToken('accessToken')->accessToken;
                $user->status = 'online';
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

    public function verify(Request $request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        $user = User::find($request->route('id'));
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
        return auth()->user();
    }

    public function logout()
    {
        $user = Auth::guard('api')->user()->token();
        $auth_user = auth()->user();
        $auth_user->status = 'offline';
        $auth_user->save();
        $user->revoke();
        $responseMessage = "Successfully logged out ";
        return response()->json([
            'success' => true,
            'message' => $responseMessage,
        ]);
    }

    public function send_reset_link_email_response(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(request()->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => 'success'])
            : response()->json(['success' => false, 'message' => 'fail']);
    }

    public function reset_password($token)
    {
        Cache::put('reset-token', $token);
        $url = url('/reset-password');
        return redirect($url);
    }

    public function send_reset_response(ResetPasswordRequest $request)
    {
        $request->validated();
        $input = $request->only(['email','token', 'password', 'password_confirmation']);
        $response = Password::reset($input, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
        $message = $response == Password::PASSWORD_RESET
            ? 'Password reset successfully'
            : 'Please write new password';
        return response()->json(['message' => $message]);
    }

    public function password_reset_token()
    {
        return Cache::get('reset-token');
    }
}
