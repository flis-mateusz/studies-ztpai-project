<?php

namespace App\Postponed;

class TestMessage
{
    public function __construct(
        private string $content,
    ) {
    }

    public function getContent(): string
    {
        return $this->content;
    }
}