<?php


class Posts
{
  static private $table = 'posts';
  static private $url_base = 'http://localhost/';

  public function listarTodos()
  {
    $pdo = Conexao::conectar();

    $limit = (isset($_REQUEST['limiteApi'])) ? $_REQUEST['limiteApi'] : 15;
    $palavra = (isset($_REQUEST['palavra'])) ? $_REQUEST['palavra'] : '';
    $pagina = (isset($_REQUEST['paginaAtual'])) ? $_REQUEST['paginaAtual'] : 1;
    $publicado = (isset($_REQUEST['publicado'])) ? $_REQUEST['publicado'] : '1';

    $offset = ($pagina - 1) * $limit;

    if (!empty($_GET['palavra'])) {

      $sql = "SELECT id_post, titulo, resumo, data_publicacao, publicado,

      CASE 
      
      WHEN ((LOCATE('$palavra', titulo) > 0)  AND (locate('$palavra', resumo) > 0)) then 4
      WHEN (LOCATE('$palavra', titulo) > 0) THEN 3
      WHEN (LOCATE('$palavra', resumo) > 0) THEN 2
      ELSE 1
      END AS RANK
      FROM posts
                
      WHERE publicado ='$publicado' AND (titulo LIKE '%$palavra%' OR resumo  LIKE '%$palavra%')    
      OR EXISTS (SELECT 1 FROM post_itens WHERE lk_post = id_post and conteudo like '%$palavra%' and publicado='$publicado')
           
      ORDER BY RANK DESC LIMIT {$limit} OFFSET {$offset}";
    } else {
      $sql = "SELECT id_post, titulo, resumo, data_publicacao, publicado FROM posts WHERE publicado ='$publicado' ORDER BY titulo LIMIT {$limit} OFFSET {$offset}";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

      $res1 = $stmt->fetchAll(\PDO::FETCH_ASSOC);

      // Retorna o total dos item da query e faz a contagem dos registros
      $sql_total = 'SELECT count(id_post) FROM posts';
      $stmt_total = $pdo->prepare($sql_total);
      $stmt_total->execute();

      if ($stmt_total->rowCount() > 0) {
        $total = $stmt_total->fetchAll(\PDO::FETCH_ASSOC);
        $res1[0] += ["total" => $total];
      }
      echo json_encode($res1);
    }

    $pdo = null;
  }

  public static function listarUm($id)
  {
    $pdo = Conexao::conectar();

    //$url_base = 'https://suporte.morohsoftware.com';
    $url_base = 'http://localhost';

    $caminho_img = '/MorohApiSuport/public/assets/imagens/';
    $caminho_img_url = '/MorohApiSuport/public/assets/imagens_urls/';

    $caminho_video = '/MorohApiSuport/public/assets/videos/';
    $caminho_video_url = '/MorohApiSuport/public/assets/videos_urls/';

    //Select na tabela POST
    $sql1 = "SELECT id_post, titulo, resumo, obs, data_publicacao, publicado FROM posts WHERE posts.id_post = :id";
    $stmt1 = $pdo->prepare($sql1);
    $stmt1->bindValue(':id', $id);
    $stmt1->execute();

    if ($stmt1->rowCount() > 0) {

      $res1 = $stmt1->fetchAll(\PDO::FETCH_ASSOC);

      // Select na tabela Post_ITENS
      $sql2 = "SELECT  id_post_item, lk_post, ordem, titulo_passo, conteudo, observacao, data_hora FROM post_itens WHERE lk_post = :id ORDER BY ordem";
      $stmt2 = $pdo->prepare($sql2);
      $stmt2->bindValue(':id', $id);
      $stmt2->execute();

      // Res2 armazena um array de post_itens
      $res2 = $stmt2->fetchAll(\PDO::FETCH_ASSOC);

      // Select na tabela Post_RELACOES (id, id_relacao, lk_post)
      $sql3 = "SELECT id, id_relacao, posts.titulo FROM post_relacoes, posts WHERE post_relacoes.id_relacao = posts.id_post and  post_relacoes.lk_post = :id";
      $stmt3 = $pdo->prepare($sql3);
      $stmt3->bindValue(':id', $id);
      $stmt3->execute();

      // Res3 armazena um array de posts que tem relação com outros 
      $res3 = $stmt3->fetchAll(\PDO::FETCH_ASSOC);

      // Select na tabela categorias (id, descrição)
      $sql4 = "SELECT id_cat AS id, descricao FROM categorias, posts WHERE categorias.id_cat = posts.lk_categoria AND posts.id_post = :id";
      $stmt4 = $pdo->prepare($sql4);
      $stmt4->bindValue(':id', $id);
      $stmt4->execute();

      // Res4 armazena um array de categorias
      $res4 = $stmt4->fetchAll(\PDO::FETCH_ASSOC);

      $pdo = null;

      $nome_img = [];
      $nome_img_url = [];
      $nome_video = [];
      $nome_video_url = [];

      foreach ($res2 as $item) {
        $nome_img[] += $item['id_post_item'];
        $nome_img_url[] += $item['id_post_item'];
        $nome_video[] += $item['id_post_item'];
        $nome_video_url[] += $item['id_post_item'];
      }

      // Selecionando a url da imagem, no diretório
      for ($i = 0; $i < count($res2); ++$i) {
        $diretorio = 'assets/imagens/' .  $nome_img[$i] . '.png';
        $diretorio_img_url = 'assets/imagens_urls/' . $nome_img_url[$i] . '.png';

        $diretorio_video = 'assets/videos/' . $nome_video[$i] . '.mp4';
        $diretorio_video_url = 'assets/videos_urls/' . $nome_video_url[$i] . '.txt';

        if (file_exists($diretorio)) {
          $res2[$i] += ["imagem" => $url_base . $caminho_img . $nome_img[$i] . '.png'];
        }

        if (file_exists($diretorio_img_url)) {
          $res2[$i] += ["url_imagem" => $url_base . $caminho_img_url . $nome_img_url[$i] . '.png'];
        }

        if (file_exists($diretorio_video)) {
          $res2[$i] += ["video" => $url_base . $caminho_video . $nome_video[$i] . '.mp4'];
        }

        if (file_exists($diretorio_video_url)) {

          $url = file_get_contents($diretorio_video_url);
          $res2[$i] += ["url_video" => $url];
        }
      }

      $res1[0] += ["postitem" => $res2, "relacao" => $res3, "categoria" => $res4];

      echo json_encode($res1[0]);
    } else {
      echo json_encode(["ERROR" => "Nenhum post encontrado!"]);
    }
  }

  public function adicionar()
  {
    $pdo = Conexao::conectar();
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $id = $obj['id_post'];
    $postitem = $obj['postitem'];
    $relacao = $obj['relacao'];

    if ($obj['lk_categoria'] == '') {
      $obj['lk_categoria'] = null;
    }

    $categoria = $obj['lk_categoria'];
    $campos = [];
    $chaves = [];
    $valores = [];

    if (!$obj) {
      echo json_encode(['ERROR' => 'Não foi possível criar o post!']);
    } else if (is_string($categoria) || $categoria == null) {
      date_default_timezone_set('America/Sao_Paulo');

      //separar em array campos (para montar a estrutuda do update com bind), chaves e valores
      foreach ($obj as $key => $value) {

        if ($key == 'id_post') continue;
        if ($key == 'postitem') continue;
        if ($key == 'relacao') continue;

        array_push($campos, $key);
        array_push($chaves, ":" . $key);
        array_push($valores, $value);
      }

      $sql = 'INSERT INTO posts (' . implode(",", $campos) . ') VALUES (' . implode(",", $chaves) . ')';
      $stmt = $pdo->prepare($sql);

      for ($indice = 0; $indice < count($chaves); $indice++) {
        $stmt->bindValue($chaves[$indice], $valores[$indice]);
      }

      $stmt->bindValue(':data_publicacao', date('Y-m-d H:i:s'));
      $stmt->execute();

      $resultado = $stmt->rowCount();

      $last_id = $pdo->lastInsertId();

      if ($resultado > 0) {
        foreach ($postitem as $item) {


          if ($item['lk_post'] == null) {
            $item['lk_post'] = $last_id;
          }

          if (!$item['id_post_item']) {

            PostItem::adicionar(json_encode($item));
          }
        }

        foreach ($relacao as $item) {

          if ($item['lk_post'] == null) {
            $item['lk_post'] = $last_id;
          }

          if (!$item['id']) {
            PostRelacao::adicionar(json_encode($item));
          }
        }
      }
    } else {

      date_default_timezone_set('America/Sao_Paulo');

      //separar em array campos (para montar a estrutuda do update com bind), chaves e valores
      foreach ($obj as $key => $value) {

        if ($key == 'id_post') continue;
        if ($key == 'postitem') continue;
        if ($key == 'relacao') continue;
        if ($key == 'lk_categoria') continue;

        array_push($campos, $key);
        array_push($chaves, ":" . $key);
        array_push($valores, $value);
      }

      $sql = 'INSERT INTO posts (' . implode(",", $campos) . ') VALUES (' . implode(",", $chaves) . ')';
      $stmt = $pdo->prepare($sql);

      for ($indice = 0; $indice < count($chaves); $indice++) {
        $stmt->bindValue($chaves[$indice], $valores[$indice]);
      }

      $stmt->bindValue(':data_publicacao', date('Y-m-d H:i:s'));
      $stmt->execute();

      $resultado = $stmt->rowCount();

      $last_id = $pdo->lastInsertId();

      if ($resultado > 0) {
        foreach ($postitem as $item) {

          if ($item['lk_post'] == null) {
            $item['lk_post'] = $last_id;
          }

          if (!$item['id_post_item']) {
            PostItem::adicionar(json_encode($item));
          }
        }

        foreach ($relacao as $item) {

          if ($item['lk_post'] == null) {
            $item['lk_post'] = $last_id;
          }

          if (!$item['id']) {
            PostRelacao::adicionar(json_encode($item));
          }
        }

        foreach ($categoria as $item) {

          if (!$item['id_cat']) {

            Categoria::adicionar(json_encode($item));

            $sql = "SELECT LAST_INSERT_ID() FROM categorias";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            $ult_id_categ = $result[0]["LAST_INSERT_ID()"];
          }

          $sql = 'UPDATE posts SET lk_categoria = :ult_id_categ WHERE id_post = :last_id';
          $stmt = $pdo->prepare($sql);
          $stmt->bindValue(':ult_id_categ', $ult_id_categ);
          $stmt->bindValue(':last_id', $last_id);
          $stmt->execute();
        }
      } else {
        echo json_encode("Não foi possível criar o Post!");
      }
    }
  }

  public function atualizar($id)
  {
    $pdo = Conexao::conectar();

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    try {
      $postitem = $obj['postitem'];
      $relacao = $obj['relacao'];
    } catch (Exception $e) {
      echo "Não localizou postitem: ou : idpost\n\n" . $e;
      print_r($obj);
      die;
    }

    if (key_exists('lk_categoria', $obj) && $obj['lk_categoria'] == '') {
      $obj['lk_categoria'] = null;
    }

    $campos = [];
    $chaves = [];
    $valores = [];

    if ($id != null) {
      foreach ($obj as $key => $value) {
        if ($key == 'id_post') continue;
        if ($key == 'postitem') continue;
        if ($key == 'relacao') continue;
        if ($key == 'categoria') continue;

        array_push($campos, $key . " = :" . $key);
        array_push($chaves, ":" . $key);
        array_push($valores, $value);
      }

      date_default_timezone_set('America/Sao_Paulo');

      $sql = 'UPDATE posts SET ' . implode(",", $campos) . ' WHERE id_post = :id';
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);

      for ($indice = 0; $indice < count($chaves); $indice++) {
        $stmt->bindValue($chaves[$indice], $valores[$indice]);
      }

      $stmt->bindValue(':data_publicacao', date('Y-m-d H:i:s'));
      $stmt->execute();
      $resultado = $stmt->rowCount();

      if ($resultado > 0) {
        foreach ($postitem as $item) {
          if ($item['lk_post'] == null) {
            $item['lk_post'] = $id;
          }

          if (!$item['id_post_item'])
            PostItem::adicionar(json_encode($item));
          else
            PostItem::atualizar(json_encode($item));
        }

        foreach ($relacao as $item2) {

          if (!$item2['id']) {
            PostRelacao::adicionar(json_encode($item2));
          }
        }

        if (array_key_exists('categoria', $obj)) {
          $categoria = $obj['categoria'];

          if (is_array($categoria)) {

            foreach ($categoria as $item) {

              if (!$item['id_cat']) {

                Categoria::adicionar(json_encode($item));

                $sql = "SELECT LAST_INSERT_ID() FROM categorias";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();

                $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                $ult_id_categ = $result[0]["LAST_INSERT_ID()"];

                $sql2 = 'UPDATE posts SET lk_categoria = :ult_id_categ WHERE id_post = :id';
                $stmt2 = $pdo->prepare($sql2);
                $stmt2->bindValue(':ult_id_categ', $ult_id_categ);
                $stmt2->bindValue(':id', $id);
                $stmt2->execute();
              }
            }
          }
        }

        $resultado = ["status" => "sucesso", "message" => "Post de ID: " . $id . " Atualizado com sucesso!"];
        echo json_encode($resultado);
      }

      $pdo = null;
    } else {
      $retorno = ["status" => "error", "message" => "Falha na atualização do post!"];
      echo json_encode($retorno);
    }
  }

  public function deletar($id)
  {
    $pdo = Conexao::conectar();

    $sql = "DELETE FROM posts WHERE id_post = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $sql = "SELECT id_post_item FROM post_itens WHERE lk_post = :id";
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);
      $stmt->execute();

      $resultado = $stmt->fetchAll(\PDO::FETCH_ASSOC);

      $id_deletado1 = [];

      foreach ($resultado as $item) {
        $id_deletado1[] += $item['id_post_item'];
      }

      for ($i = 0; $i < count($resultado); ++$i) {
        PostItem::deletar($id_deletado1[$i]);
      }

      $sql2 = "DELETE FROM post_relacoes WHERE lk_post = :id";
      $stmt2 = $pdo->prepare($sql2);
      $stmt2->bindValue(':id', $id);
      $stmt2->execute();

      echo json_encode(["sucesso" => "Post de ID: " . $id . " Excluído com sucesso!"]);
    } else {
      echo json_encode(["ERROR" => "Post de ID: " . $id . " Não encontrado!"]);
    }
    $pdo = null;
  }

  public static function deletarRelacao($id)
  {
    $pdo = Conexao::conectar();

    $sql = "DELETE FROM post_relacoes WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id); //Erro aqui
    $stmt->execute();
    $pdo = null;

    if ($stmt->rowCount() > 0) {
      echo json_encode(["sucesso" => "ID_RELAÇÃO: ' . $id . ' deletado com sucesso!"]);
    } else {
      echo json_encode(["ERROR" => "Falha ao deletar registros em ID_RELAÇÃO: " . $id . " !"]);
    }
  }
}
