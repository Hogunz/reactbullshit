<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    $file = \Illuminate\Http\UploadedFile::fake()->image('test.jpg');
    $file->store('partners', 'public');
    echo 'success';
} catch (\Throwable $e) {
    echo get_class($e) . ': ' . $e->getMessage() . "\n" . $e->getTraceAsString();
}
