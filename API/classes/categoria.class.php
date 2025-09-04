<?php

class Categoria
{
  // Método para selecionar um post_item pelo id_post_item
  public static function listarUma($id)
  {
    $pdo = Conexao::conectar();

    $publicado = (isset($_REQUEST['publicado'])) ? $_REQUEST['publicado'] : "1";

    $sql1 = "SELECT id_cat AS id, descricao, id_pai, 0 AS tipo 
                      FROM categorias
                      WHERE categorias.id_pai = $id ORDER BY descricao";
    $stmt1 = $pdo->prepare($sql1);
    $stmt1->execute();
    $resultado1 = $stmt1->fetchAll(\PDO::FETCH_ASSOC);

    $sql2 = "SELECT posts.id_post AS id, posts.titulo AS descricao,
                          posts.lk_categoria AS lk_categoria, 1 AS tipo
                      FROM posts 
                      WHERE posts.lk_categoria = $id AND publicado='$publicado' ORDER BY titulo";
    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute();
    $resultado2 = $stmt2->fetchAll(\PDO::FETCH_ASSOC);
    $pdo = null;

    if ($stmt2->rowCount() > 0) {
      echo json_encode(array_merge($resultado1, $resultado2));
    } else {
      echo json_encode($resultado1);
    }
  }

  // Método para selecionar Categorias, subcategorias e posts
  public static function listarTodos()
  {
    $pdo = Conexao::conectar();

    $publicado = (isset($_REQUEST['publicado'])) ? $_REQUEST['publicado'] : "1";

    $sql = 'SELECT id_cat AS id, descricao, id_pai, 0 AS tipo FROM categorias 
      WHERE categorias.id_pai IS NULL 
      ORDER BY descricao';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    // Selecionando todos os posts, que não possuem categorias
    $sql2 = "SELECT posts.id_post AS id, 
      posts.titulo AS descricao,
      posts.lk_categoria AS lk_categoria, 
      1 AS tipo
  FROM posts
  WHERE posts.lk_categoria IS NULL AND publicado='$publicado'
  ORDER BY descricao";

    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute();
    $res2 = $stmt2->fetchAll(\PDO::FETCH_ASSOC);
    $pdo = null;

    $res3 =  array_merge($res, $res2);
    echo json_encode($res3);
  }

  public static function adicionar()
  {
    $pdo = Conexao::conectar();
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    if ($dados['id_pai'] == '') {
      $dados['id_pai'] = null;
    }

    $campos2 = [];
    $chaves2 = [];
    $valores2 = [];

    if ($dados != null) {

      foreach ($dados as $key2 => $value2) {
        array_push($campos2, $key2);
        array_push($chaves2, ":" . $key2);
        array_push($valores2, $value2);
      }

      $sql2 = 'INSERT INTO categorias (' . implode(",", $campos2) . ') VALUES (' . implode(",", $chaves2) . ')';
      $stmt2 = $pdo->prepare($sql2);

      for ($indice2 = 0; $indice2 < count($chaves2); $indice2++) {
        $stmt2->bindValue($chaves2[$indice2], $valores2[$indice2]);
      }

      $stmt2->execute();
      $pdo = null;

      if ($stmt2->rowCount() > 0) {
        $retorno = ["status" => "sucesso", "message" => "A nova categoria foi cadastrada!"];
        echo json_encode($retorno);
      } else {
        $retorno = ["status" => "error", "message" => "Erro ao cadastrar nova categoria!"];
        echo json_encode($retorno);
      }
    } else {
      echo json_encode(["ERROR" => "Falha ao criar uma categoria."]);
    }
  }

  // Método de atualização de um postitem
  public static function atualizar($id)
  {
    $pdo = Conexao::conectar();

    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    $id = $dados['id_cat'];

    if (key_exists('id_pai', $dados) && $dados['id_pai'] == '') {
      $dados['id_pai'] = null;
    }

    $sql = "SELECT * FROM categorias WHERE id_cat = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

      $campos = [];
      $chaves = [];
      $valores = [];

      foreach ($dados as $key => $value) {
        array_push($campos, $key . " = :" . $key);
        array_push($chaves, ":" . $key);
        array_push($valores, $value);
      }

      $sql = 'UPDATE categorias SET ' . implode(",", $campos) . ' WHERE id_cat = :id';
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);

      for ($indice = 0; $indice < count($chaves); $indice++) {
        $stmt->bindValue($chaves[$indice], $valores[$indice]);
      }
      $stmt->execute();
      $pdo = null;

      if ($stmt->rowCount() > 0) {
        echo json_encode('Categoria atualizada com sucesso!');
      } else {
        echo json_encode('Não foi possível atualizar a Categoria!');
      }
    } else {
      echo json_encode(["ERROR" => "Falha ao atualizar a Categoria!"]);
    }
  }

  // Função que deleta um post_item completo
  public static function deletar($id)
  {
    $pdo = Conexao::conectar();

    $sql = "SELECT * FROM posts WHERE lk_categoria = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 1) {
      echo json_encode(["ERROR" => "Categoria de ID: " . $id . " Ainda possui mais de 1 post vinculado!"]);
    } else {
      $sql = "DELETE FROM categorias 
                WHERE id_cat = :id";
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);
      $stmt->execute();

      $lk_cat = null;
      $sql2 = 'UPDATE posts SET lk_categoria = :lk_cat WHERE lk_categoria = :id';
      $stmt2 = $pdo->prepare($sql2);
      $stmt2->bindValue(':lk_cat', $lk_cat);
      $stmt2->bindValue(':id', $id);
      $stmt2->execute();
      $pdo = null;

      echo json_encode(["sucesso" => "Categoria de ID: " . $id . " Excluída com sucesso!"]);
    }
  }

  public static function listarTodasSubcategorias()
  {
    $pdo = Conexao::conectar();

    // Selecionando as Categorias
    $sql = 'SELECT id_cat AS id, descricao  FROM categorias 
    WHERE categorias.id_pai IS NULL
    ORDER BY descricao';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $categorias = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    // Selecionando as subcategorias
    $sql2 = 'SELECT id_cat AS id, descricao, id_pai FROM categorias 
    WHERE categorias.id_pai IS NOT NULL 
    ORDER BY descricao';
    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute();
    $subcategorias = $stmt2->fetchAll(\PDO::FETCH_ASSOC);

    // Adicionando as subcategorias a categoria pelo id_pai
    for ($i = 0; $i < count($categorias); ++$i) {
      foreach ($subcategorias as $subcat) {
        if ($subcat['id_pai'] == $categorias[$i]['id']) {
          $categorias[$i] += ['sub' => []];
          array_push($categorias[$i]['sub'], $subcat);
        }
      }
    }

    echo json_encode($categorias);
  }
}
