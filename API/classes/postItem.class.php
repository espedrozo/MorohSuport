<?php

class PostItem
{
  // Método para selecionar um post_item pelo id_post_item
  public static function listarUm($id)
  {
    $pdo = Conexao::conectar();

    $sql = 'SELECT * FROM post_itens WHERE id_post_item = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    $pdo = null;

    if ($stmt->rowCount() > 0) {
      echo json_encode($stmt->fetchAll(\PDO::FETCH_ASSOC));
    } else {
      echo json_encode(['ERROR' => 'Nenhum Post_Item encontrado!']);
    }
  }

  // Método para selecionar todos os post_itens de um post principal
  public static function listarTodos()
  {
    $pdo = Conexao::conectar();

    $sql = 'SELECT * FROM post_itens';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $pdo = null;

    if ($stmt->rowCount() > 0) {
      echo json_encode($stmt->fetchAll(\PDO::FETCH_ASSOC));
    } else {
      echo json_encode(['ERROR' => 'Nenhum Post_Item encontrado!']);
    }
  }

  public static function adicionar($json)
  {
    $pdo = Conexao::conectar();

    $dados = json_decode($json, true);

    $imagem_string = $dados['imagem'] ?? "";
    $url_imagem_string = $dados['url_imagem']  ?? "";
    $video_string = $dados['video'] ?? "";
    $url_video_string = $dados['url_video'] ?? "";

    $campos2 = [];
    $chaves2 = [];
    $valores2 = [];

    if ($dados != null) {
      date_default_timezone_set('America/Sao_Paulo');

      foreach ($dados as $key2 => $value2) {

        if ($key2 == 'imagem') continue;
        if ($key2 == 'url_imagem') continue;

        if ($key2 == 'video') continue;
        if ($key2 == 'url_video') continue;

        array_push($campos2, $key2);
        array_push($chaves2, ":" . $key2);
        array_push($valores2, $value2);
      }

      $sql2 = 'INSERT INTO post_itens (' . implode(",", $campos2) . ') VALUES (' . implode(",", $chaves2) . ')';
      $stmt2 = $pdo->prepare($sql2);

      for ($indice2 = 0; $indice2 < count($chaves2); $indice2++) {

        $stmt2->bindValue($chaves2[$indice2], $valores2[$indice2]);
      }

      $stmt2->bindValue(':data_hora', date('Y-m-d H:i:s'));
      $stmt2->execute();
      $ultimo_id = $pdo->lastInsertId();
      $pdo = null;

      if ($imagem_string != '') {
        list($tipo, $imagem_string) = explode(';', $imagem_string);
        list(, $imagem_string) = explode(',', $imagem_string);

        $imagem_decodificada = base64_decode($imagem_string);

        if ($imagem_decodificada) {
          $diretorio = 'assets/imagens/';
          file_put_contents($diretorio . $ultimo_id . '.png', $imagem_decodificada);
        }
      }

      if ($url_imagem_string != '') {

        list($tipo, $url_imagem_string) = explode(';', $url_imagem_string);
        list(, $url_imagem_string) = explode(',', $url_imagem_string);

        $imagem_url_decodificada = base64_decode($url_imagem_string);

        if ($imagem_url_decodificada) {
          $diretorio = 'assets/imagens_urls/';
          file_put_contents($diretorio . $ultimo_id . '.png', $imagem_url_decodificada);
        }
      }

      if ($video_string != '') {
        list($tipo, $video_string) = explode(';', $video_string);
        list(, $video_string) = explode(',', $video_string);

        $video_decodificado = base64_decode($video_string);

        if ($video_decodificado) {
          $diretorio = 'assets/videos/';
          file_put_contents($diretorio . $ultimo_id . '.mp4', $video_decodificado);
        }
      }

      if ($url_video_string != '') {
        $urlCorrigida = str_replace('watch?v=', 'embed/', $url_video_string);
        $diretorio = 'assets/videos_urls/' . $ultimo_id . '.txt';
        file_put_contents($diretorio, $urlCorrigida);
      }

      if ($stmt2->rowCount() > 0) {
        echo json_encode(['sucesso' => 'Post Item criado com sucesso!']);
      } else {
        echo json_encode(["ERROR" => "Falha ao criar Post ITEM!"]);
      }
    } else {
      echo json_encode(["ERROR" => "Falha ao inserir Post ITEM!"]);
    }
  }

  public static function atualizar($json)
  {
    $pdo = Conexao::conectar();

    $dados = json_decode($json, true);
    $id = $dados['id_post_item'];

    $sql = "SELECT  id_post_item FROM post_itens WHERE id_post_item = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      date_default_timezone_set('America/Sao_Paulo');

      $campos = [];
      $chaves = [];
      $valores = [];

      foreach ($dados as $key => $value) {
        if ($key == 'imagem') continue;
        if ($key == 'url_imagem') continue;

        if ($key == 'video') continue;
        if ($key == 'url_video') continue;

        array_push($campos, $key . " = :" . $key);
        array_push($chaves, ":" . $key);
        array_push($valores, $value);
      }

      $sql = 'UPDATE post_itens SET ' . implode(",", $campos) . ' WHERE id_post_item = :id';
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);

      for ($indice = 0; $indice < count($chaves); $indice++) {
        $stmt->bindValue($chaves[$indice], $valores[$indice]);
      }

      $stmt->bindValue(':data_hora', date('Y-m-d H:i:s'));
      $stmt->execute();

      $pdo = null;

      $url_base = 'http://localhost';

      $caminho_imagem = '/MorohApiSuport/public/assets/imagens/';
      $caminho_imagem_url = '/MorohApiSuport/public/assets/imagens_urls/';

      $caminho_video = '/MorohApiSuport/public/assets/videos/';
      $caminho_video_url = '/MorohApiSuport/public/assets/videos_urls/';

      $imagem_url_local = $url_base . $caminho_imagem . $id . '.png';
      $imagem_url_web = $url_base . $caminho_imagem_url . $id . '.png';

      $video_url_local = $url_base . $caminho_video . $id . '.mp4';
      $video_url_web = $url_base . $caminho_video_url . $id . '.txt';

      if (array_key_exists("imagem", $dados)) {
        $imagem_string = $dados['imagem'];

        if ($imagem_string != '' && $imagem_string != $imagem_url_local) {
          list(, $imagem_string) = explode(';', $imagem_string);
          list(, $imagem_string) = explode(',', $imagem_string);
          $imagem_decodificada = base64_decode($imagem_string);

          if ($imagem_decodificada) {
            $diretorio = 'assets/imagens/';
            $arquivo = $diretorio . $id . '.png';

            if (file_exists($arquivo)) {
              unlink($arquivo);
              file_put_contents($diretorio . $id . '.png', $imagem_decodificada);
            } else {
              file_put_contents($diretorio . $id . '.png', $imagem_decodificada);
            }
          }
        }
      }

      if (array_key_exists("url_imagem", $dados)) {
        $imagem_string = $dados['url_imagem'];

        if ($imagem_string != '' && $imagem_string != $imagem_url_web) {
          list(, $imagem_string) = explode(';', $imagem_string);
          list(, $imagem_string) = explode(',', $imagem_string);
          $imagem_decodificada = base64_decode($imagem_string);

          if ($imagem_decodificada) {
            $diretorio = 'assets/imagens_urls/';
            $arquivo = $diretorio . $id . '.png';

            if (file_exists($arquivo)) {
              unlink($arquivo);
              file_put_contents($diretorio . $id . '.png', $imagem_decodificada);
            } else {
              file_put_contents($diretorio . $id . '.png', $imagem_decodificada);
            }
          }
        }
      }

      if (array_key_exists("video", $dados)) {
        $video_string = $dados['video'];

        if ($video_string != '' && $video_string != $video_url_local) {
          list(, $video_string) = explode(';', $video_string);
          list(, $video_string) = explode(',', $video_string);
          $video_decodificado = base64_decode($video_string);

          if ($video_decodificado) {
            $diretorio = 'assets/videos/';
            $arquivo = $diretorio . $id . '.mp4';

            if (file_exists($arquivo)) {
              unlink($arquivo);
              file_put_contents($diretorio . $id . '.mp4', $video_decodificado);
            } else {
              file_put_contents($diretorio . $id . '.mp4', $video_decodificado);
            }
          }
        }
      }

      if (array_key_exists("url_video", $dados)) {
        $video_string = $dados['url_video'];

        if ($video_string != '' && $video_string != $video_url_web) {
          $urlCorrigida = str_replace('watch?v=', 'embed/', $video_string);

          if ($urlCorrigida) {
            $diretorio = 'assets/videos_urls/';
            $arquivo = $diretorio . $id . '.txt';

            if (file_exists($arquivo)) {
              unlink($arquivo);
              file_put_contents($diretorio . $id . '.txt', $urlCorrigida);
            } else {
              file_put_contents($diretorio . $id . '.txt', $urlCorrigida);
            }
          }
        }
      }

      if ($stmt->rowCount() > 0) {
        echo json_encode(['sucesso' => 'Post Item atualizado com sucesso!']);
      } else {
        echo json_encode(['ERROR' => 'Não foi possível atualizar o Post Item!']);
      }
    }
  }

  public static function deletar($id)
  {
    $pdo = Conexao::conectar();

    $sql = "DELETE FROM post_itens WHERE id_post_item = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    $pdo = null;

    if ($stmt->rowCount() > 0) {

      $arquivo_imagem = 'assets/imagens/' . $id . '.png';
      $arquivo_imagem_url = 'assets/imagens_urls/' . $id . '.png';

      $arquivo_video = 'assets/videos/' . $id . '.mp4';
      $arquivo_video_url = 'assets/videos_urls/' . $id . '.txt';

      if (file_exists($arquivo_imagem)) {
        unlink($arquivo_imagem);
        echo 'IMAGEM: ' . $id . ' deletada com sucesso!';
      }
      if (file_exists($arquivo_imagem_url)) {
        unlink($arquivo_imagem_url);
        echo 'IMAGEM_URL: ' . $id . ' deletada com sucesso!';
      }
      if (file_exists($arquivo_video)) {
        unlink($arquivo_video);
        echo 'VIDEO: ' . $id . ' deletado com sucesso!';
      }
      if (file_exists($arquivo_video_url)) {
        unlink($arquivo_video_url);
        echo 'VIDEO_URL: ' . $id . ' deletado com sucesso!';
      }

      echo json_encode(["sucesso" => "PostItem deletado com sucesso!"]);
    } else {
      echo json_encode(["ERROR" => "PostItem não existe!"]);
    }
  }
}
