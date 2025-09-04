<?php

class Urls
{
  static private $table = 'urls';
  static private $url_base = 'https://link.morohsoftware.com/';

  public function listarTodos()
  {
    $pdo = Conexao::conectar();
    $response = $pdo->prepare('SELECT * from ' . self::$table);
    $response->execute();
    $object = $response->fetchAll(PDO::FETCH_ASSOC);

    if ($object) {
      echo json_encode(["código" => "0", "status" => "Sucesso", "data" => $object, "totalCount" => count($object)]);
    } else {
      echo json_encode(["código" => "1", "status" => "Error", "message" => 'Não existem dados para retornar']);
    }
    $pdo = null;

  }

  public static function listarUnico($url_short)
  {
    $pdo = Conexao::conectar();

    $sql = 'SELECT url_short FROM ' . self::$table . ' WHERE url_short = :url_short';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':url_short', $url_short);
    $stmt->execute();
    $url_short = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    if ($stmt->rowCount() > 0) {

      $url_short_complete = self::$url_base . $url_short[0]['url_short'];

      $resultado = ["código" => "0", "status" => "Sucesso", "url_short" => $url_short_complete];

      echo json_encode($resultado);
    } else {

      $resultado = ["código" => "1", "status" => "Error", "message" => "A URL é inválida!"];

      echo json_encode($resultado);
    }
    $pdo = null;
  }

  public function adicionar()
  {
    $pdo = Conexao::conectar();
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $url_origin = $obj['url_origin'];

    date_default_timezone_set('America/Sao_Paulo');

    $sql = 'SELECT url_short FROM ' . self::$table . ' WHERE url_origin = :url_origin';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':url_origin', $url_origin);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $url_short = $stmt->fetchAll(\PDO::FETCH_ASSOC);

      $url_short_complete = self::$url_base . $url_short[0]['url_short'];
      $resultado = ["código" => "0", "status" => "Sucesso", "url_short" => $url_short_complete];
      echo json_encode($resultado);
    } else {

        $hexadecimal = dechex(date('ymdHis'));

        $sql = 'INSERT INTO ' . self::$table . ' (url_origin, url_short) VALUES (:url_origin, :url_short)';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':url_origin', $url_origin);
        $stmt->bindValue(':url_short', $hexadecimal);
        $stmt->execute();

        $new_url_short = self::$url_base . $hexadecimal;
        $resultado = ["código" => "0", "status" => "Sucesso", "url_short" => $new_url_short];
        echo json_encode($resultado);

    }
    $pdo = null;
  }

  public function atualizar($param)
  {
    array_shift($_POST);

    $sql = "UPDATE urls SET ";

    $contador = 1;
    foreach (array_keys($_POST) as $indice) {
      if (count($_POST) > $contador) {
        $sql .= "{$indice} = '{$_POST[$indice]}', ";
      } else {
        $sql .= "{$indice} = '{$_POST[$indice]}' ";
      }
      $contador++;
    }

    $sql .= "WHERE id={$param}";

    $pdo = Conexao::conectar();
    $response = $pdo->prepare($sql);
    $result = $response->execute();
    $pdo = null;

    if ($result) {
      echo json_encode(["status" => "Sucesso", "message" => "Dados atualizados com sucesso!"]);
    } else {
      echo json_encode(["status" => "error", "message" => "Erro ao atualizar os dados!"]);
    }
  }

  public function deletar($param)
  {
    $pdo = Conexao::conectar();
    $response = $pdo->prepare("DELETE FROM urls WHERE id={$param}");
    $result = $response->execute();
    $pdo = null;

    if ($result) {
      echo json_encode(["status" => "Sucesso", "message" => "URL de ID:{$param} excluida com sucesso!"]);
    } else {
      echo json_encode(["status" => "error", "message" => "Erro ao excluir a url de ID:{$param}"]);
    }
  }
}
