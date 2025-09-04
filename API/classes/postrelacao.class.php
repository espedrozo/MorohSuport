<?php

class PostRelacao
{
  public static function adicionar($json = null)
  {
    $pdo = Conexao::conectar();

    $dadosdometodo = true;
    if ($json === null) {
      $json = file_get_contents('php://input');
      $dadosdometodo = false;
    };

    $dados = json_decode($json, true);

    $campos2 = [];
    $chaves2 = [];
    $valores2 = [];

    if ($dados != null) {

      foreach ($dados as $key2 => $value2) {

        if ($key2 == 'titulo') continue;

        array_push($campos2, $key2);
        array_push($chaves2, ":" . $key2);
        array_push($valores2, $value2);
      }

      $sql2 = 'INSERT INTO post_relacoes (' . implode(",", $campos2) . ') VALUES (' . implode(",", $chaves2) . ')';
      $stmt2 = $pdo->prepare($sql2);

      //laco para fazer o bind a partir das chaves e valores informados, os indices de chaves e valores serão equivalentes
      for ($indice2 = 0; $indice2 < count($chaves2); $indice2++) {
        $stmt2->bindValue($chaves2[$indice2], $valores2[$indice2]);
      }

      $stmt2->execute();
      $resultado = $stmt2->rowCount();

      if ($dadosdometodo == false) {
        return 'Sucesso!';
      } else {
        return $resultado;
      }
    } else {
      throw new \Exception("Falha ao criar links relacionados");
    }
    $pdo = null;
  }
}
