<?php

namespace App\Repository\AuthRepository;

use Illuminate\Support\ServiceProvider;

class AuthRepoSeviceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(Authable::class, AuthService::class);
    }

}
