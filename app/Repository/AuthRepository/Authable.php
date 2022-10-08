<?php

namespace App\Repository\AuthRepository;

interface Authable
{
    public function sign_up($request): \Illuminate\Http\JsonResponse;

    public function sign_in($request): \Illuminate\Http\JsonResponse;

    public function verify($request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse;

    public function profile(): ?\Illuminate\Contracts\Auth\Authenticatable;

    public function logout(): \Illuminate\Http\JsonResponse;

    public function send_reset_link_email_response($request): \Illuminate\Http\JsonResponse;

    public function reset_password($token): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse;

    public function send_reset_response($request): \Illuminate\Http\JsonResponse;

    public function updateProfile($request): \Illuminate\Http\JsonResponse;
}
