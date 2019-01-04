<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);


$dns = "mysql:host=mysql.weblink.com.br;dbname=u474814639_marmi";
$user = 'u474814639_marmi';
$pass = '123456';

//$counter = $objData->counter;
//$token = $objData->token;
$token = $_GET['token'];

try {	
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}

	if ($token === "1f3d2gs3f2fg3as2fdg3re2t1we46er45" && isset($token)) {
	//if (true) {
		

	$query = $con->prepare('SELECT * FROM marmitaria');

		$query->execute();

		$out = "[";

		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"id_marmitaria": "'.$result["id_marmitaria"].'",';
			$out .= '"nome_fantasia": "'.$result["nome_fantasia"].'",';
			$out .= '"endereco": "'.$result["endereco"].'",';
			$out .= '"pagamento": "'.$result["pagamento"].'"}';
		}
		$out .= "]";
		echo $out;
	
	}

} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};