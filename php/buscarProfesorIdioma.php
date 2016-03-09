<?php


$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$idioma=$_REQUEST['idioma'];
$academia=$_REQUEST['academia'];
$consulta=$conexion->query("select  dni,nombre from profesor where id_academia='$academia' and id_idioma='$idioma'");
//echo "select  dni,nombre from profesor where id_academia='$academia' and id_idioma='$idioma'";
while($fila=mysqli_fetch_assoc($consulta))
    $datos[]=$fila;

if(!isset($datos))
    $datos=false;
echo json_encode($datos);
$conexion->close();
?>







