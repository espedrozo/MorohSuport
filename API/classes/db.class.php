<?php

class Conexao
{
  # Variável que guarda a conexão PDO.
  protected static $db;

  # Private construct - garante que a classe só possa ser instanciada internamente.
  private function __construct()
  {
    # Informações sobre o banco de dados: DESENVOLVIMENTO

    $db_host = "localhost";
    $db_nome = "morohs37_suporte";
    $db_usuario = "root";
    $db_senha = "";
    $db_driver = "mysql";


    # Informações sobre o banco de dados: MOROSOFTWARE PRODUÇÃO
    /*   
      $db_host = "localhost";
        $db_nome = "morohs37_suporte";
        $db_usuario = "morohs37_User1";
        $db_senha = "aVaqOk%Ew6$8";
        $db_driver = "mysql";
    */

    try {
      # Atribui o objeto PDO à variável $db.
      self::$db = new PDO("$db_driver:host=$db_host; dbname=$db_nome", $db_usuario, $db_senha);
      # Garante que o PDO lance exceções durante erros.
      self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      # Garante que os dados sejam armazenados com codificação UFT-8.
      self::$db->exec('SET NAMES utf8');
    } catch (PDOException $e) {
      # Envia um e-mail para o e-mail oficial do sistema, em caso de erro de conexão.
      //mail($sistema_email, "PDOException em $sistema_titulo", $e->getMessage());
      # Então não carrega nada mais da página.
      return ("Connection Error: " . $e->getMessage());
    }
  }

  # Método estático - acessível sem instanciação.
  public static function conectar()
  {
    # Garante uma única instância. Se não existe uma conexão, criamos uma nova.
    if (!self::$db) {
      new Conexao();
    }

    # Retorna a conexão.
    return self::$db;
  }
}
