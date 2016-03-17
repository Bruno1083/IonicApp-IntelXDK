<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);


$dns = "mysql:host=localhost;dbname=aula";
$user = "root";
$pass = "";

$counter = $objData->counter;
$token = $objData->token;

try {	
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}

	if ($token === "1f3d2gs3f2fg3as2fdg3re2t1we46er45" && isset($token)) {
		

	$query = $con->prepare('SELECT * FROM usuarios ORDER BY nome LIMIT '.$counter.', 5');

		$query->execute();

		$out = "[";

		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"id": "'.$result["id"].'",';
			$out .= '"nome": "'.$result["nome"].'",';
			$out .= '"email": "'.$result["email"].'",';
			$out .= '"senha": "'.$result["senha"].'"}';
		}
		$out .= "]";
		echo $out;
	
	}

} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};