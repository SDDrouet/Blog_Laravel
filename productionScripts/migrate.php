<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<pre>";

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Illuminate\Contracts\Console\Kernel;

// Cargar el archivo .env si existe
$envPath = __DIR__ . '/../';
if (file_exists($envPath . '.env')) {
    $dotenv = Dotenv::createImmutable($envPath);
    $dotenv->load();
}

try {
    $app = require_once __DIR__ . '/../bootstrap/app.php';

    // Ejecutar comandos desde el núcleo de la consola de Laravel
    $kernel = $app->make(Kernel::class);

    echo "🔁 Ejecutando migraciones y seeders...\n\n";

    $exitCode = $kernel->call('migrate', [
        '--force' => true,
        '--seed' => true,
    ]);

    echo "✅ Migración completada (código: $exitCode)\n\n";
    echo $kernel->output();

} catch (Throwable $e) {
    echo "❌ Se produjo un error:\n";
    echo $e->getMessage() . "\n\n";
    echo $e->getTraceAsString();
}

echo "</pre>";
