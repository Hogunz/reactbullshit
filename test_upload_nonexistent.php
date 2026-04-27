<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$file = new \Illuminate\Http\UploadedFile(
    'C:/nonexistent_file.tmp',
    'test.jpg',
    'image/jpeg',
    \UPLOAD_ERR_OK,
    true
);

try {
    $file->store('partners', 'public');
    echo "Stored successfully\n";
} catch (\Throwable $e) {
    echo get_class($e) . ': ' . $e->getMessage() . "\n" . $e->getTraceAsString();
}
