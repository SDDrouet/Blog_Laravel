<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\HtmlString;
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
        Vite::prefetch(concurrency: 3);

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verifica tu dirección de correo electrónico')
                ->greeting('Hola, ' . $notifiable->full_name)
                ->line('Haz clic en el botón de abajo para verificar tu dirección de correo electrónico.')
                ->action('Verificar correo electrónico', $url)
                ->line('Si tienes problemas para hacer clic en el botón "Verificar correo electrónico", copia y pega la siguiente URL en tu navegador:')
                ->line(new HtmlString('<a href="'.$url.'">'.$url.'</a>'));
        });
    }
}
