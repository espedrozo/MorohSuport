<?php

class Users
{

  public function criar()
  {

    if ($_POST) {
      if (!$_POST['nome'] or !$_POST['email'] or !$_POST['senha']) {
        echo json_encode(['ERROR' => 'Todos os campos são obrigatórios!']);
      } else {
        $nome = addslashes(htmlspecialchars($_POST['nome'])) ?? '';
        $email = addslashes(htmlspecialchars($_POST['email'])) ?? '';
        $senha = addslashes(htmlspecialchars($_POST['senha'])) ?? '';
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $connPdo = Conexao::conectar();

        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $stmt = $connPdo->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount()) {
          $resultado = $stmt->fetchAll();

          if ($resultado[0]['email'] == $email) {
            echo json_encode(["status" => "error", "message" => "Email já cadastrado!"]);
            exit;
          }
        } else {

          $sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)';
          $stmt = $connPdo->prepare($sql);
          $stmt->bindValue(':nome', $nome);
          $stmt->bindValue(':email', $email);
          $stmt->bindValue(':senha', $senhaHash);
          $stmt->execute();

          $last_id = $connPdo->lastInsertId();

          $sql1 = "SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = :id LIMIT 1";
          $stmt2 = $connPdo->prepare($sql1);
          $stmt2->bindValue(':id', $last_id);
          $stmt2->execute();

          if ($stmt2->rowCount() > 0) {
            echo json_encode(["status" => "sucesso", "message" => "Usuário criado com sucesso!"]);
            exit;
          } else {
            echo json_encode(["status" => "error", "message" => "Não foi possível encontrar usuário"]);
            exit;
          }
        }
      }
    }
  }

  public function login()
  {

    $connPdo = Conexao::conectar();
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $email = $obj['email'] ?? "";
    $senha = $obj['senha'] ?? "";

    if ($email === "" or $senha === "") {
      echo json_encode(['ERROR' => 'Todos  os campos são obrigatórios!']);
    } else {
      $email = addslashes(htmlspecialchars($email)) ?? '';
      $senha = addslashes(htmlspecialchars($senha)) ?? '';
      $secretJWT = $GLOBALS['secretJWT'];

      $rs = $connPdo->prepare("SELECT * FROM usuarios WHERE email = '{$email}'");
      $exec = $rs->execute();
      $obj = $rs->fetchObject();
      $rows = $rs->rowCount();

      if ($rows > 0) {
        $idDB          = $obj->id_usuario;
        $nameDB        = $obj->nome;
        $passDB        = $obj->senha;
        $validUsername = true;
        $validPassword = password_verify($senha, $passDB) ? true : false;
      } else {
        $validUsername = false;
        $validPassword = false;
      }

      if ($validUsername and $validPassword) {
        //$nextWeek = time() + (7 * 24 * 60 * 60);
        $expire_in = time() + 60000;
        $token     = JWT::encode([
          'id_usuario'  => $idDB,
          'nome'        => $nameDB,
          'expires_in'  => $expire_in,
        ], $GLOBALS['secretJWT']);

        $connPdo->query("UPDATE usuarios SET token = '$token' WHERE id_usuario = $idDB");
        echo json_encode([
          'status' => 'sucesso',
          'usuario' => JWT::decode($token, $secretJWT),
          'token' => $token
        ]);
      } else {
        if (!$validPassword) {
          echo json_encode(['status' => 'error', 'message' => 'Email e|ou senha inválido(a)!']);
        }
      }
    }
  }

  public function verificar()
  {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
      $token = str_replace("Bearer ", "", $headers['Authorization']);
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Você não está logado, ou seu token é inválido.']);
      exit;
    }

    $connPdo   = Conexao::conectar();
    $rs   = $connPdo->prepare("SELECT * FROM usuarios WHERE token = '{$token}'");
    $exec = $rs->execute();
    $obj  = $rs->fetchObject();
    $rows = $rs->rowCount();
    $secretJWT = $GLOBALS['secretJWT'];

    if ($rows > 0) :
      $idDB    = $obj->id;
      $tokenDB = $obj->token;

      $decodedJWT = JWT::decode($tokenDB, $secretJWT);
      if ($decodedJWT->expires_in > time()) {
        return true;
      } else {
        $connPdo->query("UPDATE usuarios SET token = '' WHERE id = $idDB");
        return false;
      }
    else :
      return false;
    endif;
  }

  public static function redefinirSenha()
  {
    $pdo = Conexao::conectar();

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $email = $obj['email'];

    if (!empty($email)) {
      $sql1 = "SELECT  * FROM usuarios WHERE email = :email LIMIT 1";
      $stmt1 = $pdo->prepare($sql1);
      $stmt1->bindValue(':email', $email);
      $stmt1->execute();

      if ($stmt1->rowCount() > 0) {
        return $stmt1->fetchAll(\PDO::FETCH_ASSOC);
      } else {
        echo json_encode(['status' => 'error', 'message' => 'E-mail inválido!']);
      }
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Campo email devem ser preenchido!']);
    }
    $pdo = null;
  }

  public static function atualizarSenha()
  {
    $pdo = Conexao::conectar();

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $id = $obj['id_usuario'];
    $senha = $obj['senha'];
    $confirmarSenha = $obj['confirmarSenha'];

    if ($senha === $confirmarSenha) {
      $sql = 'UPDATE usuarios SET senha = :senha WHERE id_usuario = :id';
      $stmt = $pdo->prepare($sql);
      $stmt->bindValue(':id', $id);
      $stmt->bindValue(':senha', $senha);
      $stmt->execute();
      $pdo = null;

      if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'sucesso', 'message' => 'Senha atualizada com Sucesso!']);
      }
    } else {
      echo json_encode(['status' => 'error', 'message' => 'As Senhas não podem ser diferentes!']);
    }
  }
}
