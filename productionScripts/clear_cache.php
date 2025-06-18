<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<pre>";

require __DIR__ . '/../vendor/autoload.php';

use Illuminate\Contracts\Console\Kernel;

try {
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Kernel::class);

    $commandsClear = [
        'config:clear',
        'cache:clear',
        'route:clear',
        'view:clear',
    ];

    echo "🧹 Limpiando caché de Laravel...\n\n";

    foreach ($commandsClear as $command) {
        $kernel->call($command);
        echo "✅ $command ejecutado:\n";
        echo $kernel->output() . "\n";
    }

    // Aquí puedes reconstruir la caché de config y rutas si lo deseas
    $commandsCache = [
        'config:cache',
        'route:cache',
    ];

    echo "\n⚙️ Reconstruyendo caché para producción...\n\n";

    foreach ($commandsCache as $command) {
        $kernel->call($command);
        echo "✅ $command ejecutado:\n";
        echo $kernel->output() . "\n";
    }

    echo "\n🎉 Proceso completado correctamente.";

} catch (Throwable $e) {
    echo "❌ Error durante la ejecución:\n";
    echo $e->getMessage() . "\n\n";
    echo $e->getTraceAsString();
}

echo "</pre>";
