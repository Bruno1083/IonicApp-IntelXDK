<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
	
	$data = file_get_contents("php://input");
	$objData = json_decode($data);

	$id = $objData;

	$db = new PDO("mysql:host=mysql.hostinger.com.br;dbname=u460090852_aula", "u460090852_ionic", "123456");
	if(isset($id) && $id !== " "){
		$query = $db->prepare("DELETE FROM usuarios WHERE id=".$id);
		$query->execute();
		echo "Deletado com sucesso!";
	}else{
		echo "Não foi possivel realizar a oparação!";
	}