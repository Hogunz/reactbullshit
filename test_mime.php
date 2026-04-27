<?php
touch('empty.txt');
try {
    mime_content_type('empty.txt');
    echo 'ok';
} catch (\Throwable $e) {
    echo get_class($e) . ': ' . $e->getMessage();
}
unlink('empty.txt');
