<?php


$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$academia=$_REQUEST['academia'];
$consulta=$conexion->query("select distinct a.nombre, b.id_idioma as id from idiomas a, profesor b where b.id_idioma=a.id and b.id_academia='$academia'");

while($fila=mysqli_fetch_assoc($consulta))
    $datos[]=$fila;

if(!isset($datos))
    $datos=false;
echo json_encode($datos);
$conexion->close();
?>









