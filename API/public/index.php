<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Max-Age: 1000");
  header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
  header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
  header("Content-Type: application/json");
  header("HTTP/1.1 200 OK");
  die();
} else {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Max-Age: 1000");
  header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
  header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
  header("Content-Type: application/json");
}

date_default_timezone_set("America/Sao_Paulo");

$GLOBALS['secretJWT'] = $_POST['senha'] ?? '';

# Autoload
include_once "../classes/autoload.class.php";
new Autoload();

# ROTAS
$rota = new Rotas();

# AUTH USER
$rota->add('POST', '/users/login', 'Users::login', false);
$rota->add('POST', '/users/criar', 'Users::criar', false);
$rota->add('PUT', '/senha/atualizar', 'Users::atualizarSenha', false);
$rota->add('POST', '/senha/redefinir', 'Users::redefinirSenha', false);

# POSTS
$rota->add('POST', '/posts/adicionar', 'Posts::adicionar', false);
$rota->add('GET', '/posts/listartodos', 'Posts::listarTodos', false);
$rota->add('GET', '/posts/listar/[PARAM]', 'Posts::listarUm', false);
$rota->add('PUT', '/posts/atualizar/[PARAM]', 'Posts::atualizar', false);
$rota->add('DELETE', '/posts/deletar/[PARAM]', 'Posts::deletar', false);
$rota->add('DELETE', '/posts/relacao/[PARAM]', 'Posts::deletarRelacao', false);

# CATEGORIES
$rota->add('POST', '/categorias/adicionar', 'Categoria::adicionar', false);
$rota->add('GET', '/categorias/listartodas', 'Categoria::listarTodos', false);
$rota->add('GET', '/categorias/listar/[PARAM]', 'Categoria::listarUma', false);
$rota->add('PUT', '/categorias/atualizar/[PARAM]', 'Categoria::atualizar', false);
$rota->add('DELETE', '/categorias/deletar/[PARAM]', 'Categoria::deletar', false);

# SUBCATEGORIES
$rota->add('GET', '/subcategorias/listartodas', 'Categoria::listarTodasSubcategorias', false);

# POSTITEMS
$rota->add('POST', '/postitem/adicionar', 'PostItem::adicionar', false);
$rota->add('GET', '/postitem/listartodos', 'PostItem::listarTodos', false);
$rota->add('GET', '/postitem/listar/[PARAM]', 'PostItem::listarUm', false);
$rota->add('PUT', '/postitem/atualizar/[PARAM]', 'PostItem::atualizar', false);
$rota->add('DELETE', '/postitem/deletar/[PARAM]', 'PostItem::deletar', false);

#$rota->add('DELETE', '/urls/deletar/[PARAM]', 'Urls::deletar', true);
$rota->ir($_GET['path']);
