<?php

class Autoload
{
  public function __construct()
  {
    $dir = '../classes';
    $files = scandir($dir);

    foreach ($files as $file) {
      if (!in_array($file, ['.', '..'])) {
        include_once $file;
      }
    }
  }
}
