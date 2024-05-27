<?php

namespace App\Message;

class RemoveFileMessage
{
    private string $filename;
    private string $uploadDir;

    public function __construct(string $uploadDir, string $filename)
    {
        $this->filename = $filename;
        $this->uploadDir = $uploadDir;
    }

    public function getFilename(): string
    {
        return $this->filename;
    }

    public function getUploadDir(): string
    {
        return $this->uploadDir;
    }
}