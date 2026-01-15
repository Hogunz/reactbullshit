<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS if not localhost, or just force it for the live server fix
        if ($this->app->environment('production') || env('APP_ENV') === 'production' || request()->server('HTTP_X_FORWARDED_PROTO') === 'https') {
             URL::forceScheme('https');
        }
        // Fallback for the user's specific case where env might be wrong
        if (request()->server('HTTP_HOST') !== 'localhost' && request()->server('REMOTE_ADDR') !== '127.0.0.1') {
             URL::forceScheme('https');
        }
    }
}
